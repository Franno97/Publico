import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/models/estado-tramite-enum';
import { SoclicitudCrearMovimientoServicio } from 'projects/mre/comunes/src/lib/models/tramites-api-servicio-modelos';
import { EnviarDatosModalService } from 'projects/mre/comunes/src/lib/services/enviar-datos-modal/enviar-datos-modal.service';
import { MeensajeOnBoardService } from 'projects/mre/comunes/src/lib/services/meensaje-on-board/meensaje-on-board.service';
import { TramitesApiService } from 'projects/mre/comunes/src/lib/services/tramites-api/tramites-api.service';
import { MovimientoRequest, TramitesObj } from 'projects/mre/visas-ecuador/src/lib/modelos/models';

@Component({
  selector: 'lib-subsanar-pago-ciudadano',
  templateUrl: './subsanar-pago-ciudadano.component.html',
  styleUrls: ['./subsanar-pago-ciudadano.component.scss']
})
export class SubsanarPagoCiudadanoComponent implements OnInit {
  formData: FormGroup;
  data: any;
  visaTitular: boolean;
  observacionesName: string = "Datos Personales";
  observacionesAnteriores: string = '';
  entroSubsanacionObservaciones: boolean = false;

  movimientoActivo: MovimientoRequest;
  observacionesModel: any;
  observacionesObj: any = {};

  constructor(
    private enviarDatosModalService: EnviarDatosModalService,
    private modalService: NgbActiveModal,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private configStateService: ConfigStateService,
    private servicioTramite: TramitesApiService
  ) {
    this.formData = this.enviarDatosModalService.getReacitveForm();
    this.data = this.enviarDatosModalService.getData().data as TramitesObj;
    this.enviarDatosModalService.patchValuetoForm(this.data);
    this.visaTitular = !(this.data.solicitanteId == this.data.beneficiarioId);

    // this.movimientoActivo =  dataTemp1.movimientos[dataTemp1.movimientos.length -1];
  }

  ngOnInit(): void {
  }
  onSubmit() {
    let movimiento = {} as SoclicitudCrearMovimientoServicio;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    movimiento.estado = EstadoTramite.ValidarPago;
    movimiento.estadoOrigen = EstadoTramite.SubsanarPago;

    this.servicioTramite.crearMovimiento(movimiento).subscribe(res => {
      this.meensajeOnBoardService.showMensaje("Guardado satisfactoriamente", "success");
      this.modalService.dismiss();
    });
  }
}
