import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UnidadAdministrativaService } from '@mre/unidad-administrativa/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { ServicioService, TipoServicioService } from '@mre/unidad-administrativa/proxy/mre/sb/unidad-administrativa/servicio';
import { CitaDto, CitaService, CreateUpdateCitaDto, ObtenerDisponibilidadEntrada, PeriodoDisponibleDto, ReagendarCitaDto, ServicioCalendarioService } from '../../proxy/cita';
import { finalize } from 'rxjs/operators';
import { EstadoCita } from '../../proxy/dominio';

@Component({
  selector: 'lib-reagendar-cita',
  templateUrl: './reagendar-cita.component.html',
  styleUrls: ['./reagendar-cita.component.css']
})
export class ReagendarCitaComponent implements OnInit {

  mostrarFormulario = false;
  cita: CitaDto;
  formulario: FormGroup;

  maxDate: any;
  minDate: any;

  listaHorarios: string[];

  procesando = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private servicioTipoDeServicio: TipoServicioService,
    private servicio: ServicioService,
    private administrateUnitService: UnidadAdministrativaService,
    private servicioCalendarioService: ServicioCalendarioService,
    private citaService: CitaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const paramValue = this.activatedRoute.snapshot.params.id;
    const request = this.citaService.get(paramValue);
    request.subscribe(respuesta => {
      this.cita = respuesta;
      this.publicarDatosCita();
    });
  }

  publicarDatosCita(): void {
    const request = this.administrateUnitService.get(this.cita.unidadAdministrativaId);
    request.subscribe(respuesta => {
      this.cita.unidadAdministrativaNombre = respuesta.nombre;

      const requestServicio = this.servicio.get(this.cita.servicioId);
      requestServicio.subscribe(respuestaServicio => {
        this.cita.servicioNombre = respuestaServicio.nombre;
        this.construirFormulario();
      });
    });
  }

  construirFormulario(): void {
    const fechaHoy = new Date();
    const fechaMaxima = new Date(new Date().setMonth(new Date().getMonth() + 3));
    this.maxDate = { year: fechaMaxima.getFullYear(), month: (fechaMaxima.getMonth() + 1), day: fechaMaxima.getDate() };
    this.minDate = { year: fechaHoy.getFullYear(), month: fechaHoy.getUTCMonth() + 1, day: fechaHoy.getDate() };
    this.listaHorarios = [];

    const fecha = new Date(this.cita.diaCita);


    this.formulario = this.fb.group({
      fecha: [{ day: fecha.getDate(), month: fecha.getMonth() + 1, year: fecha.getFullYear() }, [Validators.required]],
      horario: [null, [Validators.required]],
    });

    this.mostrarFormulario = true;
    this.obtenerDisponibilidad();
  }

  cambioFechaHorario(): void {
    this.formulario.controls.horario.setValue(null);
    this.obtenerDisponibilidad();
  }

  obtenerDisponibilidad(): void {
    this.procesando = true;

    const temporalDate: NgbDateStruct = this.formulario.controls.fecha.value;
    const myDate = new Date(temporalDate.year, temporalDate.month - 1, temporalDate.day);
    const dateIso = myDate.toISOString();

    const datosEntrada: ObtenerDisponibilidadEntrada = {
      unidadAdministrativaId: this.cita.unidadAdministrativaId,
      servicioId: this.cita.servicioId,
      fecha: dateIso
    };
    const request = this.servicioCalendarioService.obtenerPeriodosDisponiblesByEntrada(datosEntrada);
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

  guardar(): void {
    if (this.formulario.invalid) {
      return;
    }

    this.procesando = true;

    const horario = this.formulario.controls.horario.value;
    const horarioSplitted= horario.split(":",2);
    const fechaTemporal: NgbDateStruct = this.formulario.controls.fecha.value;
    const fecha= new Date(fechaTemporal.year, fechaTemporal.month -1, fechaTemporal.day, horarioSplitted[0], horarioSplitted[1]);
    const fechaIso = fecha.toISOString();

    const estadoCita: EstadoCita = EstadoCita.Registrado;

    

    const entrada: ReagendarCitaDto = {
      id: this.cita.id,
      inicio: fechaIso
    };

    const request = this.citaService.reagendarByEntrada(entrada);
    request.pipe(finalize(() => (this.procesando = false)))
      .subscribe(() => {
        this.router.navigate(['/citas/']);
      });
  }

}
