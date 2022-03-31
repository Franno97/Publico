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
import { ReconocimientoFacialFacetecDto } from '../../modelos/reconocimiento-facial-facetec';


@Component({
  selector: 'lib-reconocimiento-facial-ciudadano',
  templateUrl: './reconocimiento-facial-ciudadano.component.html',
  styleUrls: ['./reconocimiento-facial-ciudadano.component.scss']
})

export class ReconocimientoFacialCiudadanoComponent implements OnInit {
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

  datosReconocimientoFacial: ReconocimientoFacialFacetecDto;
  reconocimientoFacialProcesado = false;
  resultadoReconocimientoFacial: boolean;


  constructor(
    private enviarDatosModalService: EnviarDatosModalService,
    private modalService: NgbActiveModal,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private configStateService: ConfigStateService,
    private servicioTramite: TramitesApiService,
  ) {
    let dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle
    this.data = dataTemp.data as TramitesObj;
    this.formData = this.enviarDatosModalService.getReacitveForm();
    this.enviarDatosModalService.patchValuetoForm(this.data);
    this.visaTitular = !(this.data.solicitanteId == this.data.beneficiarioId);

    // this.movimientoActivo =  dataTemp1.movimientos[dataTemp1.movimientos.length -1];
  }

  ngOnInit(): void {
    let photo = this.data.beneficiario.foto;
    let order = photo.indexOf(';');
    photo = photo.substring(order + 1, photo.length);
    photo = photo.replace('base64,', '');
    this.datosReconocimientoFacial = {
      imagen2dBase64: photo,
      prefijoIdentificadorUnico: 'Cancilleria_Visas',
      nivelMinimoComparacionFoto: 6
    };
  }

  resultadoProcesoComparar(data: boolean) {
    console.log('Se dispara el evento resultadoProcesoComparar y el valor de data es');
    console.log(data);
    this.reconocimientoFacialProcesado = true;
    this.resultadoReconocimientoFacial = data;
  }

  onSubmit() {
    let movimiento = {} as SoclicitudCrearMovimientoServicio;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    // movimiento.estado = this.resultadoReconocimientoFacial ? 18 : 14;
    //movimiento.estado = this.resultadoReconocimientoFacial ? EstadoTramite.RealizarPago : EstadoTramite.GenerarCitaSubsanacionReconocimientoFacial;
    movimiento.estado = 18;

    this.servicioTramite.crearMovimiento(movimiento).subscribe(res => {
      this.meensajeOnBoardService.showMensaje("Guardado satisfactoriamente", "success");
      this.modalService.dismiss();
    });
  }
}
