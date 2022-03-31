import { ConfigStateService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VisualizarImagenComponent } from 'projects/mre/comunes/src/lib/components/visualizar-imagen/visualizar-imagen.component';
import { DetalleArchivo, SolicitudGrabarDocumentoZipGestion } from 'projects/mre/comunes/src/lib/models/documentos-api-servicio-modelo';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/models/estado-tramite-enum';
import {
  DetalleSolicitudCrearDocumento,
  SoclicitudCrearMovimientoServicio,
  SolicitudCrearDocumentoServicio
} from 'projects/mre/comunes/src/lib/models/tramites-api-servicio-modelos';
import { VisualizarImagenDato } from 'projects/mre/comunes/src/lib/models/visualizar-imagen-dato';
import { DocumentosApiService } from 'projects/mre/comunes/src/lib/services/documentos-api/documentos-api.service';
import { EnviarDatosModalService } from 'projects/mre/comunes/src/lib/services/enviar-datos-modal/enviar-datos-modal.service';
import { MeensajeOnBoardService } from 'projects/mre/comunes/src/lib/services/meensaje-on-board/meensaje-on-board.service';
import { TramitesApiService } from 'projects/mre/comunes/src/lib/services/tramites-api/tramites-api.service';
import { MovimientoRequest, TramitesObj } from 'projects/mre/visas-ecuador/src/lib/modelos/models';
import {
  SolicitudListaRegistroPagoDetalle,
  SolicitudObtenerPagoServicio, SolicitudRegistrarPagoServicio
} from '../../modelos/pagos-api-servicio-modelos';
import { PagosApiService } from '../../services/pagos-api/pagos-api.service';

@Component({
  selector: 'lib-registro-pago-ciudadano',
  templateUrl: './registro-pago-ciudadano.component.html',
  styleUrls: ['./registro-pago-ciudadano.component.scss']
})
export class RegistroPagoCiudadanoComponent implements OnInit {
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
  pagoId = '';

  constructor(
    private enviarDatosModalService: EnviarDatosModalService,
    private modalService: NgbActiveModal,
    private meensajeOnBoardService: MeensajeOnBoardService,
    private configStateService: ConfigStateService,
    private servicioTramite: TramitesApiService,
    private servicioDocumento: DocumentosApiService,
    private servicioPagos: PagosApiService,
    private servicioConfirmacion: ConfirmationService,
    private ventanaModal: NgbModal
  ) {
  }

  ngOnInit(): void {
    const dataTemp = this.enviarDatosModalService.getData();
    this.formTitle = dataTemp.formTitle
    this.data = dataTemp.data as TramitesObj;
    this.formData = this.enviarDatosModalService.getReacitveForm();
    this.enviarDatosModalService.patchValuetoForm(this.data);
    this.visaTitular = !(this.data.solicitanteId == this.data.beneficiarioId);

    this.obtenerPago();
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

  // Publica los pagos
  publicarPagos(registros: any[]): void {
    this.registrosMostrar = [];
    registros.forEach(x => {
      this.pagoId = x.idPago;
      const pago = {
        id: x.id,
        descripcion: x.descripcion,
        numeroOrden: x.ordenPago,
        numeroTransaccion: x.numeroTransaccion,
        valor: x.valorTotal,
        tipoArchivo: '',
        imagenBase64: '',
        puedeVer: false,
        partidaArancelaria: x.partidaArancelaria
      };

      this.registrosMostrar.push(pago);
    });
  }

  // Sube el archivo seleccionado
  subirArchivo(event: any, registroId: string): void {
    const archivo = event.target.files[0];

    const optionsError: Partial<Confirmation.Options> = {
      hideCancelBtn: false,
      hideYesBtn: true,
      cancelText: 'Cerrar',
      yesText: 'Confirm',
      messageLocalizationParams: ['Demo'],
      titleLocalizationParams: [],
    };

    if (archivo.size >= 5242880) {
      this.servicioConfirmacion.error('El archivo debe ser menor de 5 Mb', 'Error', optionsError)

      return;
    }

    if (archivo.type !== 'image/jpeg' && archivo.type !== 'application/pdf' && archivo.type !== 'image/png') {
      this.servicioConfirmacion.error('Solamente se permiten imágenes y pdf', 'Error', optionsError)

      return;
    }

    const tipoArchivo = this.obtenerTipoArchivo(archivo);

    this.readBase64(archivo)
      .then(respuesta => {
        this.actualizarImagenRegistro(respuesta, tipoArchivo, registroId, archivo);
      });
  }

  // Actualiza la imagen en un registro
  actualizarImagenRegistro(imagenBase64: string, tipoArchivo: string, registroId: string, archivo: any): void {
    this.registrosMostrar.forEach(x => {
      if (x.id === registroId) {
        x.tipoArchivo = tipoArchivo;
        x.imagenBase64 = imagenBase64;
        x.puedeVer = true;
        x.nombreArchivo = archivo.name;
        x.archivo = archivo;
      }
    });
  }


  // Obtiene el tipo de archivo
  obtenerTipoArchivo(fichero: File): string {
    let tipoArchivo: string;
    switch (fichero.type) {
      case 'image/jpeg':
        tipoArchivo = 'imagen';
        break;
      case 'image/png':
        tipoArchivo = 'imagen';
        break;
      case 'application/pdf':
        tipoArchivo = 'pdf';
        break;
      default: {
      }
    }
    return tipoArchivo;
  }

  // Convierte un archivo en base64
  private readBase64(file): Promise<any> {
    const reader = new FileReader();
    const future = new Promise((resolve, reject) => {
      reader.addEventListener('load', function () {
        resolve(reader.result);
      }, false);
      reader.addEventListener('error', function (event) {
        reject(event);
      }, false);

      reader.readAsDataURL(file);
    });
    return future;
  }

  verImagen(registro: any): void {
    const dato: VisualizarImagenDato = {
      tipo: registro.tipoArchivo,
      imagenBase64: registro.imagenBase64,
      visualizarUrl: false,
      url: ''
    };
    this.enviarDatosModalService.setData(dato);
    this.ventanaModal.open(VisualizarImagenComponent);
  }

  // Guardar la información cuando se presionar el botón de guardar
  guardarFormulario(): void {
    this.crearDocumento();
  }

  // Crea el documento
  crearDocumento(): void {
    const currentUser = this.configStateService.getOne('currentUser');
    let solicitud: SolicitudCrearDocumentoServicio = {
      tramiteId: this.data.id,
      createdId: currentUser.id,
      documentos: []
    };
    this.registrosMostrar.forEach(x => {
      if (x.nombreArchivo !== undefined && x.nombreArchivo !== null && x.nombreArchivo !== '') {
        const detalle = this.obtenerDetalleCrearDocumento(x);
        solicitud.documentos.push(detalle);
      }
    });

    this.servicioTramite.crearDocumento(solicitud)
      .subscribe(respuesta => {
        if (respuesta.httpStatusCode === 200) {
          this.cargarDocumentos();
        } else {
          this.meensajeOnBoardService.showMensaje('Error al crear los documentos', "info");
        }
      });
  }

  // Sube los archivos al datacap
  cargarDocumentos(): void {
    let archivos: DetalleArchivo[] = []
    this.registrosMostrar.forEach(x => {
      const detalle = this.obtenerDetalleCrearDocumento(x);
      const archivo: DetalleArchivo = {
        nombreArchivo: detalle.nombre,
        archivo: x.archivo
      };

      archivos.push(archivo);
    });
    const solicitud: SolicitudGrabarDocumentoZipGestion = {
      tramiteId: this.data.id,
      archivos: archivos
    };

    this.servicioDocumento.postGrabarDocumentoZip(solicitud)
      .subscribe(respuesta => {
        if (respuesta.Estado === 'OK') {
          this.registrarPago();
        } else {
          this.meensajeOnBoardService.showMensaje('Error al subir los documentos', "info");
        }
      });
  }

  // Obtiene el detalle al crear un documento
  obtenerDetalleCrearDocumento(registro: any): DetalleSolicitudCrearDocumento {
    let detalle: DetalleSolicitudCrearDocumento = null;
    let tipoDocumento = '';
    if (registro.partidaArancelaria === 'Solicitud de Visas') {
      tipoDocumento = 'PAGO1';
    } else if (registro.partidaArancelaria === 'Orden de cedulación') {
      tipoDocumento = 'PAGO2';
    }

    if (tipoDocumento !== '') {
      const extension = registro.nombreArchivo.split('.').pop();

      detalle = {
        nombre: this.data.beneficiario.codigoMDG + '_' + tipoDocumento + '.' + extension,
        tipoDocumento: tipoDocumento,
        observacion: '',
      };
    }

    return detalle;
  }

  // Registra el pago
  registrarPago(): void {
    const currentUser = this.configStateService.getOne('currentUser');
    const detalles = this.obtenerListaPagoDetalle();
    const solicitud: SolicitudRegistrarPagoServicio = {
      id: this.pagoId,
      idTramite: this.data.id,
      idUsuario: currentUser.id,
      listaRegistroPagoDetalle: detalles
    };
    this.servicioPagos.postRegistrarPago(solicitud).subscribe(respuesta => {
      this.guardarMovimiento();
    });
  }

  obtenerListaPagoDetalle(): SolicitudListaRegistroPagoDetalle[] {
    let resultados: SolicitudListaRegistroPagoDetalle[] = [];
    this.registrosMostrar.forEach(x => {
      const detalle: SolicitudListaRegistroPagoDetalle = {
        id: x.id,
        numeroTransaccion: '',
        comprobantePago: x.imagenBase64,
        fechaPago:new Date(1900,1,1)
      };
      resultados.push(detalle);
    });

    return resultados;
  }

  // Guarda el movimiento
  guardarMovimiento(): void {
    let movimiento = {} as SoclicitudCrearMovimientoServicio;
    const data = this.data as TramitesObj;
    const currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
    // movimiento.estado = 20;
    movimiento.estado = EstadoTramite.ValidarPago;
    movimiento.estadoOrigen = EstadoTramite.RegistrarPago;

    this.servicioTramite.crearMovimiento(movimiento).subscribe(res => {
      this.meensajeOnBoardService.showMensaje("Guardado satisfactoriamente", "success");
      this.modalService.dismiss();
    });
  }


}
