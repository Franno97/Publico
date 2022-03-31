import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/models/estado-tramite-enum';
import { EnviarDatosModalService } from 'projects/mre/comunes/src/lib/services/enviar-datos-modal/enviar-datos-modal.service';
import { MultasApiService } from 'projects/mre/comunes/src/lib/services/multas-api/multas-api.service';
import { TramitesApiService } from 'projects/mre/comunes/src/lib/services/tramites-api/tramites-api.service';
import { MovimientoRequest, TramitesObj } from 'projects/mre/visas-ecuador/src/lib/modelos/models';
import { RealizarPagoCiudadanoComponent } from '../realizar-pago-ciudadano/realizar-pago-ciudadano.component';
import { ReconocimientoFacialCiudadanoComponent } from '../reconocimiento-facial-ciudadano/reconocimiento-facial-ciudadano.component';
import { RegistroPagoCiudadanoComponent } from '../registro-pago-ciudadano/registro-pago-ciudadano.component';
import { SubsanacionInformacionCiudadanoComponent } from '../subsanacion-informacion-ciudadano/subsanacion-informacion-ciudadano.component';

@Component({
  selector: 'lib-tramites-pendientes',
  templateUrl: './tramites-pendientes.component.html',
  styleUrls: ['./tramites-pendientes.component.scss']
})
export class TramitesPendientesComponent implements OnInit {
  formTitle: string = "Trámites pendientes";
  tabDataSource: Array<any> = [];
  tabHeader: Array<any> = [
    { name: 'Nro trámite', propiedad: 'numero' },
    { name: 'Solicitante', propiedad: 'solicitante.nombres' },
    { name: 'Beneficiario', propiedad: 'beneficiario.nombres' },
    { name: 'Fecha de trámite', propiedad: 'fecha' },
    { name: 'Estado de trámite', propiedad: 'movimientos.nombreEstado' },
    { name: 'Seleccionar', icon: ['fas fa-eye'], valShow: 'icon' }
  ];

  formData = this.fb.group({
    numberMDG: ["OJOJO"],
    cedulaSolicitante: [{ value: null, disabled: true }, Validators.required],
    nacionalidadSolicitante: [{ value: null, disabled: true }, Validators.required],
    nombreCompletSolicitanteo: [{ value: null, disabled: true }, Validators.required],
    paisSolicitante: [{ value: null, disabled: true }, Validators.required],
    ciudadSolicitante: [{ value: null, disabled: true }, Validators.required],
    paisConsuladoUnidadAdministrativaSolicitante: [{ value: null, disabled: true }, Validators.required],
    direccionSolicitante: [{ value: null, disabled: true }, Validators.required],
    telefonoSolicitante: [{ value: null, disabled: true }, Validators.required],
    edadSolicitante: [{ value: null, disabled: true }, Validators.required],
    correoSolicitante: [{ value: null, disabled: true }, Validators.required],
    nombreConsuladoUnidadAdministrativaSolicitante: [{ value: null, disabled: true }, Validators.required],
    // --------------------------------------
    fechaSolicitudBeneficiario: [{ value: null, disabled: true }, Validators.required],
    primerApellidoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    segundoApellidoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    nombreCompletoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    numberMDGBeneficiario: [{ value: null, disabled: true }, Validators.required],
    paisNacimientoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    ciudadNacimientoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    fechaNacimientoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    edadBeneficiario: [{ value: null, disabled: true }, Validators.required],
    estadoCivilBeneficiario: [{ value: null, disabled: true }, Validators.required],
    nacionalidadBeneficiario: [{ value: null, disabled: true }, Validators.required],
    generoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    emailBeneficiario: [{ value: null, disabled: true }, Validators.required],
    calidadMigratoria: [{ value: null, disabled: true }, Validators.required],
    grupoBeneficiario: [{ value: null, disabled: true }, Validators.required],
    tipoVisaBeneficiario: [{ value: null, disabled: true }, Validators.required],
    actividadDesarrollarBeneficiario: [{ value: null, disabled: true }, Validators.required],
    discapacidadBeneficiario: [{ value: null, disabled: true }, Validators.required],
    porcientoDiscapacidadBeneficiario: [{ value: null, disabled: true }, Validators.required],
    numeroCarnetConadisBeneficiario: [{ value: null, disabled: true }, Validators.required],
    paisDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    provinciaDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    ciudadDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    telefonoDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    celularDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    direccionDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    telefonoTrabajoDomicilioBeneficiario: [{ value: null, disabled: true }, Validators.required],
    numeroPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    fechaEmisionPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    paisEmisionPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    nombreCompletoPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    fechaExpiracionPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    ciudadEmisionPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    fechaNacimientoPasaporteBeneficiario: [{ value: null, disabled: true }, Validators.required],
    tieneVisaBeneficiario: [{ value: null, disabled: true }, Validators.required],
    numeroVisaBeneficiario: [{ value: null, disabled: true }, Validators.required],
    fechaEmisionVisaBeneficiario: [{ value: null, disabled: true }, Validators.required],
    numero1VisaBeneficiario: [{ value: null, disabled: true }, Validators.required],
    fechaExpiracionVisaBeneficiario: [{ value: null, disabled: true }, Validators.required],
  });

  @ViewChild(DatatableComponent, { static: false }) tablaPendientes: DatatableComponent;
  registrosPorPagina = 10;
  registrosMostrar: any[] = [];
  registrosMostrarTemporal: any[] = [];
  filtro: string = '';

  constructor(
    private fb: FormBuilder,
    private configStateService: ConfigStateService,
    private enviarDatosModalService: EnviarDatosModalService,
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private servicioTramite: TramitesApiService,
    private servicioMulta: MultasApiService
  ) {


  }

  ngOnInit(): void {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.config.centered = false;
    this.config.size = 'xl';
    const currentUser = this.configStateService.getOne('currentUser');
    const idUser = currentUser.id;
    this.config.beforeDismiss = () => {
      this.servicioTramite.consultarTramitesPorCiudadanoId(idUser)
        .subscribe(response => {
          this.tabDataSource = response.result;
          this.cargarDatos();
        });
      return true;
    }
    this.enviarDatosModalService.setReactiveForm(this.formData);

    this.servicioTramite.consultarTramitesPorCiudadanoId(idUser)
      .subscribe(response => {
        this.tabDataSource = response.result;
        this.cargarDatos();
      });


  }

  // Carga la información que se va a mostrar en la tabla
  cargarDatos(): void {
    this.registrosMostrar = [];
    this.registrosMostrarTemporal = [];
    this.tabDataSource.forEach(x => {
      let registroTemporal = x;
      registroTemporal.estadoFinal = '';
      registroTemporal.rolAsigando = '';
      if (x.movimientos !== undefined && x.movimientos !== null && x.movimientos.length > 0) {
        const movimiento = x.movimientos[(x.movimientos.length - 1)];
        const estado: string = movimiento.nombreEstado;
        const rolAsignado = movimiento.nombreRol;
        registroTemporal.estadoFinal = estado;
        registroTemporal.rolAsigando = rolAsignado;

        const permiteSeleccionar = rolAsignado === 'Ciudadano';
        registroTemporal.permiteSeleccionar = permiteSeleccionar;

      }
      this.registrosMostrarTemporal.push(registroTemporal);
    });
    this.registrosMostrar = this.registrosMostrarTemporal;
  }

  // Aplica el filtro en la tabla
  aplicarFiltro(event: any): void {
    const filtro = event.target.value.toLowerCase();

    // filter our data
    const temp = this.registrosMostrarTemporal.filter(function (d) {
      return d.numero.toLowerCase().indexOf(filtro) !== -1
        || d.solicitante.nombres.toLowerCase().indexOf(filtro) !== -1
        || d.fecha.toLowerCase().indexOf(filtro) !== -1
        || (d.rolAsigando !== undefined && d.rolAsigando !== null && d.rolAsigando !== '' && d.rolAsigando.toLowerCase().indexOf(filtro) !== -1)
        || (d.estadoFinal !== undefined && d.estadoFinal !== null && d.estadoFinal !== '' && d.estadoFinal.toLowerCase().indexOf(filtro) !== -1) || !filtro;
    });

    // update the rows
    this.registrosMostrar = temp;
    // Whenever the filter changes, always go back to the first page
    this.tablaPendientes.offset = 0;
  }

  // Limpia el filtro
  limpiarBusqueda(): void {
    this.filtro = '';
    this.registrosMostrar = this.registrosMostrarTemporal;
    this.tablaPendientes.offset = 0;
  }

  rowClickedEvent(data: any) {
    const objTramite = data.data as TramitesObj;

    const movimiento = objTramite.movimientos[objTramite.movimientos.length - 1] as MovimientoRequest;
    const estado = Number(movimiento.estado);

    // estado =  '18';
    // let numberMDG = objTramite.beneficiario.codigoMDG;
    switch (data.option) {
      case 'Seleccionar': {
        data.formTitle = movimiento.nombreEstado;
        this.enviarDatosModalService.setData(data);
        switch (estado) {
          // case '13':
          case EstadoTramite.ReconocimientoFacial:
            this.modalService.open(ReconocimientoFacialCiudadanoComponent);
            break;
          // case '18':
          case EstadoTramite.RealizarPago:
            this.modalService.open(RealizarPagoCiudadanoComponent);
            break;
          // case '19':
          case EstadoTramite.RegistrarPago:
            this.modalService.open(RegistroPagoCiudadanoComponent);
            break;
          // case '21':
          case EstadoTramite.SubsanarPago:
            this.modalService.open(RegistroPagoCiudadanoComponent);
            break;
          // case '4':
          case EstadoTramite.SubsanacionInformacion:
            this.servicioMulta.consultarMultasPorTramiteId(objTramite.id)
              .subscribe(response => {
                data.multas = response.result ? response.result : [];
                this.enviarDatosModalService.setData(data);
                this.modalService.open(SubsanacionInformacionCiudadanoComponent);
              })
            break;
        }
        break;
      }
    }
  }

}
