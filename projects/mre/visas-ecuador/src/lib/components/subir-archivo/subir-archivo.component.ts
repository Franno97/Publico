
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FamiliarProcesoService } from '@mre/registro-persona/proxy/mre/sb/registro-persona/proceso';
import { NgbAccordion, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Documento, formularioVisasFull } from '../../modelos/models';
import { JsonFile } from '../../modelos/Subsanacion';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { TramitesApiService } from 'projects/mre/comunes/src/lib/services/tramites-api/tramites-api.service';
import { RequisitosApiService } from 'projects/mre/comunes/src/lib/services/requisitos-api/requisitos-api.service';
import { SharepointMensajesApiService } from 'projects/mre/comunes/src/lib/services/sharepoint-mensajes-api/sharepoint-mensajes-api.service';
import { DocumentosApiService } from 'projects/mre/comunes/src/lib/services/documentos-api/documentos-api.service';
import { ArchivoCiudadanoPorCodigo, DetalleArchivo, SolicitudGrabarDocumentoZipGestion } from 'projects/mre/comunes/src/lib/models/documentos-api-servicio-modelo';

@Component({
  selector: 'lib-subir-archivo',
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.scss']
})
export class SubirArchivoComponent implements OnInit, OnChanges {
  @Output() InformacionTexto = new EventEmitter<string>();
  @Input() requisitosDocumentosaSubir = [];
  @Input() fomularioFull: formularioVisasFull;
  @Input() inicioMostrarFormulario = false;

  @ViewChild('acc') accordion: NgbAccordion;
  myFileArray: JsonFile[] = [];
  step = 0;
  ocultardiv: boolean = false;
  dirFicheroPdf: string = "";
  isLoaded: boolean = true;

  formData = this.fb.group({
    observacion: [{ value: "", disabled: false }],
  });

  classLoaded: Array<string> = [];

  optionsError: Partial<Confirmation.Options> = {
    hideCancelBtn: false,
    hideYesBtn: true,
    cancelText: 'Cerrar',
    yesText: 'Confirm',
    messageLocalizationParams: ['Demo'],
    titleLocalizationParams: [],
  };
  optionsExito: Partial<Confirmation.Options> = {
    hideCancelBtn: true,
    hideYesBtn: false,
    cancelText: 'Cerrar',
    yesText: 'Aceptar',
    messageLocalizationParams: ['Demo'],
    titleLocalizationParams: [],
  };

  constructor(
    private config: NgbModalConfig,
    private fb: FormBuilder,
    private router: Router,
    private confirmation: ConfirmationService,
    private ServiceFamiliarProceso: FamiliarProcesoService,
    private servicioTramite: TramitesApiService,
    private servicioRequisito: RequisitosApiService,
    private servicioSharepointMensaje: SharepointMensajesApiService,
    private servicioDocumento: DocumentosApiService
  ) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    for (let i in this.requisitosDocumentosaSubir)
      this.classLoaded.push("");
    this.config.beforeDismiss = () => {
      this.router.navigate(['/servicios']);
      return true;
    }
  }

  ngOnInit(): void {
    /* if (this.requisitosDocumentosaSubir.length > 0) {
      this.servicioSharepointMensaje.obtenerMensajesInformativos("Visas", this.requisitosDocumentosaSubir[0].TipoDocumental)
        .subscribe(data => {
          this.InformacionTexto.emit(data.Mensaje);
        });
    } */
  }

  // Cuando existe un cambio en alguna propiedad, valida que haya comenzado a trabajar con el formulario
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inicioMostrarFormulario && this.inicioMostrarFormulario) {
      this.cargarDocumentosAnterioresCiudadano();
    }
  }

  // Carga los documentos del ciudadano, cargados anteriormente
  cargarDocumentosAnterioresCiudadano(): void {
    // this.fomularioFull.beneficiario.codigoMDG
    this.servicioDocumento.obtenerArchivosCiudadanoPorCodigo(this.fomularioFull.beneficiario.visa.numero)
      .subscribe(respuesta => {
        if (respuesta.Archivos != null && respuesta.Archivos.length > 0) {
          this.publicarDocumentosAnteriores(respuesta.Archivos);
        }
      });
  }

  // Publica los documentos anteriores del ciudadano
  publicarDocumentosAnteriores(archivos: ArchivoCiudadanoPorCodigo[]): void {
    for (let i = 0; i < archivos.length; i++) {

      const archivo = archivos[i];
      const requisito = this.requisitosDocumentosaSubir.find(x => x.TipoDocumental === archivo.Sufijo);
      if (requisito !== undefined && requisito !== null) {
        const orden = this.obtenerOrdenRequisitoDocumento(requisito);
        this.publicarArchivoAnterior(archivo, orden);
      }

    }
  }

  obtenerOrdenRequisitoDocumento(requisito: any): number {
    let contador = 0;
    let indice;
    this.requisitosDocumentosaSubir.forEach(x => {
      if (requisito.TipoDocumental === x.TipoDocumental) {
        indice = contador;
      }
      contador++;
    });

    return indice;
  }

  // Publica el archivo anterior
  publicarArchivoAnterior(archivo: ArchivoCiudadanoPorCodigo, orden: number): void {
    const arregloRuta = archivo.Ruta.split('/');
    let nombreArchivo = arregloRuta[arregloRuta.length - 1];
    const tipoDocumental = archivo.Sufijo;
    const archivoBase64 = archivo.ArchivoBase64.replace("data:", "").replace(/^.+,/, "");

    const extension = nombreArchivo.split(".").pop();
    nombreArchivo = this.fomularioFull.beneficiario.codigoMDG + "_" + tipoDocumental + "." + extension;

    const tipoArchivo = this.obtenerMimePorExtension(extension);

    const blob = this.convertirBase64ABlob(archivoBase64, tipoArchivo);
    const archivoOriginal = new File([blob], nombreArchivo, { type: tipoArchivo });

    const archivoData: JsonFile = {
      tipoDocumental: tipoDocumental,
      nombreArchivo: nombreArchivo,
      base64: archivoBase64,
      file: archivoOriginal
    };

    for (let i = 0; i < this.myFileArray.length; i++) {
      if (this.myFileArray[i].tipoDocumental == archivo.Sufijo) {
        this.myFileArray.splice(i, 1);
      }
    }

    this.myFileArray.push(archivoData);
    this.classLoaded[orden] = "green";
    if (extension == "pdf") {
      this.requisitosDocumentosaSubir[orden].VisorPdf = archivoBase64;
      this.requisitosDocumentosaSubir[orden].IsVisible = false;
    }
    else {
      this.requisitosDocumentosaSubir[orden].IsVisible = true;
      this.subirImagenAnterior(archivoBase64, orden);
    }

  }

  // Obtiene el mime del archivo por la extensión
  obtenerMimePorExtension(extension: string): string {
    let tipo = '';
    if (extension == "pdf") {
      tipo = 'application/pdf';
    } else if (extension == 'jpg' || extension == 'png' || extension == 'jpeg') {
      tipo = 'image/' + extension;
    }
    return tipo;
  }

  // Sube la imagen guardado anteriormente por el usuario
  subirImagenAnterior(archivoBase64: string, orden: number): void {
    let cad = 'imgLoad' + orden;
    let img = document.getElementById(cad);
    img?.setAttribute('src', archivoBase64);

  }

  // Convierte texto base64 a Blob
  convertirBase64ABlob(base64: string, tipoArchivo: string): Blob {
    const byteString = window.atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: tipoArchivo });
    return blob;
  }

  onDropFile(data: any) {
    data.preventDefault();
    this.uploadFile(data);
  }

  onDragOverFile(data: DragEvent) {
    data.stopPropagation();
    data.preventDefault();
  }

  selectFile(event: any, tipoDocumental: string) {

    let nombreAnterior = event.target.files[0].name;
    let extension = nombreAnterior.split(".").pop();
    let NombreActual = this.fomularioFull.beneficiario.codigoMDG + "_" + tipoDocumental + "." + extension;
    const myNewFile = new File([event.target.files[0]], NombreActual, { type: event.target.files[0].type });
    const miJson: JsonFile = {
      tipoDocumental: tipoDocumental,
      file: myNewFile
    }
    for (let i = 0; i < this.myFileArray.length; i++) {
      if (this.myFileArray[i].tipoDocumental == tipoDocumental) {
        this.myFileArray.splice(i, 1);
      }
    }
    this.myFileArray.push(miJson);
    this.classLoaded[this.step] = "green";
    if (extension == "pdf") {
      this.getBase64(event.target.files[0]).then(
        data => {
          const base64String = data.toString();

          this.requisitosDocumentosaSubir[this.step].VisorPdf = base64String.replace("data:", "").replace(/^.+,/, "");
          this.requisitosDocumentosaSubir[this.step].IsVisible = false;

        }
      );

    }
    else {
      this.requisitosDocumentosaSubir[this.step].IsVisible = true;
      this.uploadFile(event);
    }

  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  uploadFile(event: any) {

    const file = event.target.files[0];
    let reader = new FileReader();
    let tg;
    let cad = 'imgLoad' + this.step;
    reader.onload = function (event: any) {
      let img = document.getElementById(cad);
      tg = event.target.result;

      img?.setAttribute('src', event.target.result);
    }
    reader.readAsDataURL(file);
  }


  // Guarda la información del trámite
  guardar() {
    const validacionDocumentosSubir = this.validarDocumentosSubir();

    if (validacionDocumentosSubir.length === 0) {
      let documentos: Documento[] = [];
      // let _formData = new FormData();
      let archivos: File[] = [];

      for (let i = 0; i < this.requisitosDocumentosaSubir.length; i++) {
        const archivo = this.myFileArray.find(a => a.tipoDocumental === this.requisitosDocumentosaSubir[i].TipoDocumental);
        if (archivo !== undefined && archivo !== null) {
          const nombreArchivo = archivo.nombreArchivo !== undefined && archivo.nombreArchivo !== null ?
            archivo.nombreArchivo : archivo.file.name;
          const documento: Documento = {
            // id: "",
            nombre: nombreArchivo,
            ruta: "",
            observacion: "",
            tipoDocumento: archivo.tipoDocumental,
            DescripcionDocumento: this.requisitosDocumentosaSubir[i].TipoDocumento,
            IconoNombre: this.requisitosDocumentosaSubir[i].IconoNombre,
            ImagenNombre: this.requisitosDocumentosaSubir[i].ImagenNombre,
          }
          documentos.push(documento);

          // _formData.append("miarchivos", archivo.file);
          archivos.push(archivo.file);

        }
      }

      this.guardarDatos(documentos, archivos);

    } else {
      let mensajeError = 'Corrija los siguientes errores: ';
      validacionDocumentosSubir.forEach(x => {
        mensajeError += x + '. ';
      });
      this.confirmation.warn(mensajeError, 'Validación', this.optionsError);
    }


  }

  // Realiza la validación de los documentos a subir
  validarDocumentosSubir(): string[] {
    let resultado: string[] = [];
    const documentosObligatorios = this.requisitosDocumentosaSubir.filter(x => x.Obligatorio);

    documentosObligatorios.forEach(x => {
      const documento = this.myFileArray.find(d => d.tipoDocumental === x.TipoDocumental);
      if (documento === undefined || documento === null) {
        resultado.push(x.TipoDocumento);
      }
    });

    return resultado;
  }

  // Gurda los datos
  guardarDatos(documentos: Documento[], archivos: File[]): void {
    if (this.fomularioFull.beneficiario.tipoCiudadano != 0) {
      const request = this.ServiceFamiliarProceso.guardarPersona(this.fomularioFull.beneficiario.codigoMDG);
      request.subscribe(response => {

        let Idpersona = response.id;

        this.fomularioFull.PersonaId = Idpersona;
        this.fomularioFull.documentos = documentos;
        this.fomularioFull.observacion = this.formData.controls["observacion"].value;

        this.guardarTramite(archivos);
      });
    }
    else {
      this.fomularioFull.documentos = documentos;
      this.fomularioFull.observacion = this.formData.controls["observacion"].value;

      this.guardarTramite(archivos);
    }

  }

  // Guarda el tramite
  guardarTramite(archivos: File[]): void {
    this.servicioTramite.crearTramite(this.fomularioFull).subscribe(
      respuestaTramite => {
        //Subir documentacion     tramiteId
        if (respuestaTramite.httpStatusCode === 200) {
          const numeroTramite = respuestaTramite.result.numero;
          // _formData.append("tramiteId", respuestaTramite.result.id);
          this.guardarDocumento(archivos, respuestaTramite.result.id, numeroTramite);
        } else {
          this.confirmation.error(respuestaTramite.mensaje, 'Error', this.optionsError);
        }

      },
      err => {

        this.confirmation.error(err.message, 'Error', this.optionsError);
      },
      () => console.log('HTTP request completed.')

    );
  }

  // Guardar documento
  guardarDocumento(archivos: File[], tramiteId: any, numeroTramite: string) {
    let detallesArchivos: DetalleArchivo[] = [];
    archivos.forEach(x => {
      const detalleArchivo: DetalleArchivo = {
        nombreArchivo: x.name,
        archivo: x
      };
      detallesArchivos.push(detalleArchivo);
    });

    const solicitud: SolicitudGrabarDocumentoZipGestion = {
      tramiteId: tramiteId,
      archivos: detallesArchivos,
    }
    this.servicioDocumento.postGrabarDocumentoZip(solicitud).subscribe(
      respuesta => this.confirmation.success('Su trámite está en proceso con número ' + numeroTramite, 'Guardado exitosamente', this.optionsExito),
      err => this.confirmation.error(err.message, 'Error', this.optionsError));

    /* this.servicioRequisito.grabarDocumentoZip(formData).subscribe(
      res => this.confirmation.success('Su trámite está en proceso con número ' + numeroTramite, 'Guardado exitosamente', this.optionsExito),
      err => this.confirmation.error(err.message, 'Error', this.optionsError),
    ); */
  }

  prevStep(stepcurrent) {
    stepcurrent--;

    setTimeout(() => this.accordion.toggle(stepcurrent), 0);
  }


  toggle(stepcurrent) {
    stepcurrent++;

    setTimeout(() => this.accordion.toggle(stepcurrent), 0);
  }

  beforeChange(event) {
    this.step = event.panelId;
    for (let index = 0; index < this.requisitosDocumentosaSubir.length; index++) {
      if (index == event.panelId) {
        this.servicioSharepointMensaje.obtenerMensajesInformativos("Visas", this.requisitosDocumentosaSubir[index].TipoDocumental)
          .subscribe(data => {
            this.InformacionTexto.emit(data.Mensaje);
          });
      }

    }
  }

}
