import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnidadAdministrativaDto } from '@mre/unidad-administrativa/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { UnidadAdministrativaService } from '@mre/unidad-administrativa/proxy/mre/sb/unidad-administrativa/unidad-administrativa/unidad-administrativa.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/models/estado-tramite-enum';
import { SoclicitudCrearMovimientoServicio } from 'projects/mre/comunes/src/lib/models/tramites-api-servicio-modelos';
import { EnviarDatosModalService } from 'projects/mre/comunes/src/lib/services/enviar-datos-modal/enviar-datos-modal.service';
import { MeensajeOnBoardService } from 'projects/mre/comunes/src/lib/services/meensaje-on-board/meensaje-on-board.service';
import { TramitesApiService } from 'projects/mre/comunes/src/lib/services/tramites-api/tramites-api.service';
import { MovimientoRequest, TramitesObj } from 'projects/mre/visas-ecuador/src/lib/modelos/models';
import {
  SolicitudGuardarFormaPagoServicio,
  SolicitudListaDetalle,
  SolicitudObtenerPagoServicio
} from '../../modelos/pagos-api-servicio-modelos';
import { PagosApiService } from '../../services/pagos-api/pagos-api.service';


@Component({
  selector: 'lib-realizar-pago-ciudadano',
  templateUrl: './realizar-pago-ciudadano.component.html',
  styleUrls: ['./realizar-pago-ciudadano.component.scss']
})
export class RealizarPagoCiudadanoComponent implements OnInit {
  formData: FormGroup;
  data: any;
  formTitle: string;
  visaTitular: boolean;
  observacionesName: string = "Datos Personales";
  observacionesAnteriores: string = '';
  entroSubsanacionObservaciones: boolean = false;

  movimientoActivo: MovimientoRequest;
  observacionesModel: any;
  observacionesObj: any = {};

  registrosMostrar: any[];

  mostrarFormularioTipoPago = false;

  formulario: FormGroup;

  pagoId = '';
  detallesFormaPago: SolicitudListaDetalle[];

  mostrarInformacionBancoUnidadAdministrativa = false;
  unidadAdministrativa: UnidadAdministrativaDto;

  constructor(
    private enviarDatosModalService: EnviarDatosModalService,
    private modalService: NgbActiveModal,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private configStateService: ConfigStateService,
    private servicioTramite: TramitesApiService,
    private servicioPagos: PagosApiService,
    private fb: FormBuilder,
    private servicioUnidadAdministrativa: UnidadAdministrativaService
  ) {
    // this.movimientoActivo =  dataTemp1.movimientos[dataTemp1.movimientos.length -1];
  }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle
    this.data = dataTemp.data as TramitesObj;
    this.formData = this.enviarDatosModalService.getReacitveForm();
    this.enviarDatosModalService.patchValuetoForm(this.data);
    this.visaTitular = !(this.data.solicitanteId == this.data.beneficiarioId);

    //const globalVariables = this.servicioEnvironment.getApiUrl('Pago');
    this.obtenerPago();
    this.obtenerInformacionBanco();
  }

  // Obtiene el pago del trámite
  obtenerPago(): void {
    const solicitud: SolicitudObtenerPagoServicio = {
      idTramite: this.data.id,
      valoresMayoraCero: true,
      facturarEn: '0'
    };
    this.servicioPagos.postObtenerPago(solicitud).subscribe(respuesta => {
      this.publicarPagos(respuesta.result.listaPagoDetalle);
    });
  }

  // Obtiene la información del banco
  obtenerInformacionBanco(): void {
    const solicitudUnidadAdministrativa = this.servicioUnidadAdministrativa.get(this.data.unidadAdministrativaIdCEV);
    solicitudUnidadAdministrativa.subscribe(respuestaUnidadAdministrativa => {
      this.unidadAdministrativa = respuestaUnidadAdministrativa;
      this.mostrarInformacionBancoUnidadAdministrativa = true;
    });

  }

  // Publica los pagos
  publicarPagos(registros: any[]): void {
    this.registrosMostrar = [];
    this.detallesFormaPago = [];
    registros.forEach(x => {
      this.pagoId = x.idPago;
      const pago = {
        descripcion: x.descripcion,
        valor: x.valorTotal
      };

      this.registrosMostrar.push(pago);

      const detalle: SolicitudListaDetalle = {
        id: x.id,
        valorTotal: x.valorTotal
      };

      this.detallesFormaPago.push(detalle);

    });
    this.construirFormulario();
  }

  // Inicializa y construye el formulario
  construirFormulario() {
    this.formulario = this.fb.group({
      tipoPago: ['', Validators.requiredTrue]
    })

    this.mostrarFormularioTipoPago = true;
  }

  // Guardar la información cuando se presionar el botón de guardar
  guardarFormulario(): void {
    this.guardarFormaPago();
  }

  // Guarda la forma de pago
  guardarFormaPago(): void {
    const currentUser = this.configStateService.getOne('currentUser');
    const solicitud: SolicitudGuardarFormaPagoServicio = {
      id: this.pagoId,
      formaPago: 20,
      idUsuario: currentUser.id,
      banco: this.unidadAdministrativa.banco,
      numeroCuenta: this.unidadAdministrativa.numeroCuentaBancaria,
      tipoCuenta: this.unidadAdministrativa.tipoCuentaBancaria,
      titularCuenta: this.unidadAdministrativa.titularCuentaBancaria,
      listaDetalle: this.detallesFormaPago
    };

    this.servicioPagos.postGuardarFormaPago(solicitud).subscribe(respuesta => {
      this.guardarMovimiento();
    });
  }

  // Guarda el movimiento
  guardarMovimiento(): void {
    let movimiento = {} as SoclicitudCrearMovimientoServicio;
    const data = this.data as TramitesObj;
    const currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    // movimiento.estado = 19;
    movimiento.estado = EstadoTramite.RegistrarPago;
    movimiento.estadoOrigen = EstadoTramite.RealizarPago;

    this.servicioTramite.crearMovimiento(movimiento).subscribe(res => {

      this.meensajeOnBoardService.showMensaje("Guardado satisfactoriamente", "success");
      this.modalService.dismiss();
    });
  }
}
