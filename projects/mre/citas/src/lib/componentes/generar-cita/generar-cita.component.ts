import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UnidadAdministrativaService, UnidadAdministrativaInfoDto } from '@mre/unidad-administrativa/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { ServicioService, ServicioDto, TipoServicioLookupDto, TipoServicioService } from '@mre/unidad-administrativa/proxy/mre/sb/unidad-administrativa/servicio';
import { finalize } from 'rxjs/operators';
import { CitaService, CreateUpdateCitaDto, ObtenerDisponibilidadEntrada, ObtenerServicioCalendarioEntrada, PeriodoDisponibleDto, ServicioCalendarioService } from '../../proxy/cita';
import { EstadoCita } from '../../proxy/dominio';
import { Router } from '@angular/router';
import { LocalizationService } from '@abp/ng.core';
import { PersonaService } from '@mre/registro-persona/proxy/mre/sb/registro-persona/persona';

@Component({
  selector: 'lib-generar-cita',
  templateUrl: './generar-cita.component.html',
  styleUrls: ['./generar-cita.component.css']
})
export class GenerarCitaComponent implements OnInit {

  showPreCheckError = false;
  preCheckMensajeError = '';
  procesando = false;
  formularioInicial: FormGroup;
  mostrarFormularioInicial = true;

  formularioDisponibilidad: FormGroup;
  mostrarFormularioDisponibilidad = false;

  mostrarPantallaFinal = false;

  listaTipoServicio: TipoServicioLookupDto[];
  listaServicios: ServicioDto[];
  listaUnidadesAdministrativas: UnidadAdministrativaInfoDto[];

  maxDate: any;
  minDate: any;

  listaHorarios: string[];

  unidadAdminitrativaNombre: string;
  servicioNombre: string;
  fechaSeleccionada: string;
  horaSeleccionada: string;

  mostrarMensajeErrorCrear = false;
  mensajeErrorCrear = '';

  constructor(
    private servicioLocalizacion: LocalizationService,
    private fb: FormBuilder,
    private servicioTipoDeServicio: TipoServicioService,
    private servicio: ServicioService,
    private servicioUnidadAdministrativa: UnidadAdministrativaService,
    private servicioCalendarioServicio: ServicioCalendarioService,
    private servicioCita: CitaService,
    private router: Router,
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.obtenerTiposServicios();
    this.construirFormularioInicial();
  }

  obtenerTiposServicios(): void {
    const request = this.servicioTipoDeServicio.getLookup();
    request.subscribe(respuesta => {
      this.listaTipoServicio = respuesta.items;
    });
  }

  construirFormularioInicial(): void {
    this.formularioInicial = this.fb.group({
      tipoServicioId: [null, [Validators.required]],
      servicioId: new FormControl({ value: null, disabled: true }, Validators.required),
      unidadAdministrativaId: new FormControl({ value: null, disabled: true }, Validators.required)
    });
  }

  cambioTipoServicio() {
    this.listaServicios = [];
    this.formularioInicial.controls.servicioId.disable();
    this.formularioInicial.controls.servicioId.setValue(null);
    this.listaUnidadesAdministrativas = [];
    this.formularioInicial.controls.unidadAdministrativaId.disable();
    this.formularioInicial.controls.unidadAdministrativaId.setValue(null);
    const tipoServicioId = this.formularioInicial.controls.tipoServicioId.value;
    if (tipoServicioId !== null && tipoServicioId !== undefined && tipoServicioId !== '') {
      this.obtenerServicios();
    }
  }

  obtenerServicios(): void {
    const request = this.servicio.getLookup(true);
    request.subscribe(respuesta => {
      const tipoServicioId = this.formularioInicial.controls.tipoServicioId.value;
      let listaServicios = respuesta.items;
      listaServicios = listaServicios.filter(x => x.tipoServicioId == tipoServicioId);
      this.listaServicios = listaServicios;
      this.formularioInicial.controls.servicioId.enable();
    });
  }

  cambioServicio(): void {
    this.formularioInicial.controls.unidadAdministrativaId.disable();
    this.listaUnidadesAdministrativas = [];
    this.formularioInicial.controls.unidadAdministrativaId.setValue(null);
    const servicioId = this.formularioInicial.controls.servicioId.value;
    if (servicioId !== null && servicioId !== undefined && servicioId !== '') {
      this.obtenerUnidadesAdministrativas();
    }
  }

  obtenerUnidadesAdministrativas(): void {
    const servicioId = this.formularioInicial.controls.servicioId.value;
    const request = this.servicioUnidadAdministrativa.obtenerUnidadAdministrativaPorServicio(servicioId);
    request.subscribe(respuesta => {
      this.listaUnidadesAdministrativas = respuesta.items;
      this.formularioInicial.controls.unidadAdministrativaId.enable();
    });
  }

  continuarFormularioInicial(): void {
    if (this.formularioInicial.invalid) {
      return;
    }
    this.showPreCheckError = false;
    this.procesando = true;

    const fechaHoy = new Date();
    this.minDate = { year: fechaHoy.getUTCFullYear(), month: fechaHoy.getUTCMonth() + 1, day: fechaHoy.getDate() };
    this.listaHorarios = [];

    this.validarAgendamiento();
  }

  validarAgendamiento(): void {
    this.preCheckMensajeError = '';
    const estadoCita: EstadoCita = EstadoCita.Registrado;

    const entrada: CreateUpdateCitaDto = {
      unidadAdministrativaId: this.formularioInicial.controls.unidadAdministrativaId.value,
      servicioId: this.formularioInicial.controls.servicioId.value,
      estado: estadoCita
    };

    const request = this.servicioCita.existeCitaAgendadaByEntrada(entrada);
    request.pipe(finalize(() => (this.procesando = false)))
      .subscribe(respuesta => {
        if (respuesta === true) {
          this.servicioLocalizacion.get({
            key: 'Cita::GenerarCita:CitaExistenteError',
            defaultValue: 'Error',
          }).subscribe(respuesta => {
            this.preCheckMensajeError = respuesta;
          });
          this.showPreCheckError = true;
        } else {
          this.validarExistenciaHorarios();
        }
      });
  }

  validarExistenciaHorarios(): void {
    this.procesando = true;
    const datosEntrada: ObtenerServicioCalendarioEntrada = {
      unidadAdministrativaId: this.formularioInicial.controls.unidadAdministrativaId.value,
      servicioId: this.formularioInicial.controls.servicioId.value,
    }

    const request = this.servicioCalendarioServicio.existePorServicioUnidadAdministrativaByEntrada(datosEntrada);

    request.pipe(finalize(() => (this.procesando = false)))
      .subscribe(respuesta => {
        if (respuesta === true) {
          this.mostrarFormularioInicial = false;
          this.obtenerInformacionCalendario();
        } else {
          this.servicioLocalizacion.get({
            key: 'Cita::GenerarCita:CalendarioExistenteError',
            defaultValue: 'Error',
          }).subscribe(respuesta => {
            this.preCheckMensajeError = respuesta;
          });
          this.showPreCheckError = true;
        }
      });
  }

  obtenerInformacionCalendario(): void {
    this.procesando = true;
    const datosEntrada: ObtenerServicioCalendarioEntrada = {
      unidadAdministrativaId: this.formularioInicial.controls.unidadAdministrativaId.value,
      servicioId: this.formularioInicial.controls.servicioId.value,
    }

    const request = this.servicioCalendarioServicio.obtenerPorServicioUnidadAdministrativaByEntrada(datosEntrada);
    request.pipe(finalize(() => (this.procesando = false)))
      .subscribe(respuesta => {
        const duracion: number = respuesta.length > 0 ? respuesta[0].diasDisponibilidad : 90;
        let fechaHoy = new Date();
        fechaHoy.setDate(fechaHoy.getDate() + duracion);
        this.maxDate = { year: fechaHoy.getUTCFullYear(), month: (fechaHoy.getMonth() + 1), day: fechaHoy.getDate() };
        
        //TODO: validar la configuracion si es automatica o con calendario
        this.construirFormularioValidacion();



        
      });
  }

  construirFormularioValidacion(): void {
    this.formularioDisponibilidad = this.fb.group({
      fecha: [null, [Validators.required]],
      horario: [null, [Validators.required]],
    });
    this.mostrarFormularioDisponibilidad = true;
    this.procesando = false;
  }

  cambioFechaHorario(): void {
    this.formularioDisponibilidad.controls.horario.setValue(null);
    this.obtenerDisponibilidad();
  }

  obtenerDisponibilidad(): void {
    this.procesando = true;

    const temporalDate: NgbDateStruct = this.formularioDisponibilidad.controls.fecha.value;
    const myDate = new Date(temporalDate.year, temporalDate.month - 1, temporalDate.day);
    const dateIso = myDate.toISOString();

    const datosEntrada: ObtenerDisponibilidadEntrada = {
      unidadAdministrativaId: this.formularioInicial.controls.unidadAdministrativaId.value,
      servicioId: this.formularioInicial.controls.servicioId.value,
      fecha: dateIso
    };
    const request = this.servicioCalendarioServicio.obtenerPeriodosDisponiblesByEntrada(datosEntrada);
    request.pipe(finalize(() => (this.procesando = false)))
      .subscribe(respuesta => {
        this.publicarHorarios(respuesta);
      });
  }

  publicarHorarios(periodos: PeriodoDisponibleDto[]): void {
    if (periodos.length === 0) {
      return;
    }
    this.listaHorarios = periodos[0].horarios;
  }


  continuarFormularioValidacion(): void {
    if (this.formularioDisponibilidad.invalid) {
      return;
    }

    this.procesando = true;
    this.mostrarFormularioDisponibilidad = false;

    const horario = this.formularioDisponibilidad.controls.horario.value;
    const horarioSplitted= horario.split(":",2);
    const fechaTemporal: NgbDateStruct = this.formularioDisponibilidad.controls.fecha.value;

    const fecha= new Date(fechaTemporal.year, fechaTemporal.month -1, fechaTemporal.day, horarioSplitted[0], horarioSplitted[1]);
    const fechaIso = fecha.toISOString();
    const estadoCita: EstadoCita = EstadoCita.Registrado;

    const personaRequest= this.personaService.obtenerPersonaActual();
    personaRequest.subscribe(personaDto => {
      const entrada: CreateUpdateCitaDto = {
        personaId: personaDto.id,
        unidadAdministrativaId: this.formularioInicial.controls.unidadAdministrativaId.value,
        servicioId: this.formularioInicial.controls.servicioId.value,
        inicio: fechaIso,
        estado: estadoCita
      };
  
      const request = this.servicioCita.agendarByEntrada(entrada);
      request.pipe(finalize(() => (this.procesando = false)))
        .subscribe(respuesta => {
          if (respuesta.satisfactorio === true) {
            this.publicarPantallaFinal();
          } else {
            this.mensajeErrorCrear = respuesta.mensajeError;
            this.mostrarMensajeErrorCrear = true;
          }
        });

    });


    

  }



  publicarPantallaFinal(): void {
    this.mostrarPantallaFinal = true;
    const servicioId = this.formularioInicial.controls.servicioId.value;
    const servicio = this.listaServicios.filter(x => x.id == servicioId);
    this.servicioNombre = servicio[0].nombre;

    const unidadAdministrativaId = this.formularioInicial.controls.unidadAdministrativaId.value;
    const unidadAdministrativa = this.listaUnidadesAdministrativas.filter(x => x.id == unidadAdministrativaId);
    this.unidadAdminitrativaNombre = unidadAdministrativa[0].nombre;

    const temporalDate: NgbDateStruct = this.formularioDisponibilidad.controls.fecha.value;
    this.fechaSeleccionada = temporalDate.day + '/' + temporalDate.month + '/' + temporalDate.year;
    this.horaSeleccionada = this.formularioDisponibilidad.controls.horario.value;
  }

  inicializarFormulario(): void {
    this.router.navigate(['/citas/']);
  }

  cancelar(): void {
    this.router.navigate(['/citas/']);
  }

}
