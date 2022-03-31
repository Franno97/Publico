import { ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EnviarDatosModalService } from 'projects/mre/comunes/src/lib/services/enviar-datos-modal/enviar-datos-modal.service';
import { MovimientoRequest, TramitesObj } from 'projects/mre/visas-ecuador/src/lib/modelos/models';
import { Documento, JsonFile, Subsanacion } from 'projects/mre/visas-ecuador/src/lib/modelos/Subsanacion';
import { StepsSliderService } from 'projects/mre/visas-ecuador/src/lib/services/ctrolUi/steps-slider.service';
import { ApiServiceService } from 'projects/mre/visas-ecuador/src/lib/services/servi-api/api-service.service';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { EstadoTramite } from 'projects/mre/comunes/src/lib/models/estado-tramite-enum';
import { TramitesApiService } from 'projects/mre/comunes/src/lib/services/tramites-api/tramites-api.service';
import { RequisitosApiService } from 'projects/mre/comunes/src/lib/services/requisitos-api/requisitos-api.service';
@Component({
  selector: 'lib-subsanacion-informacion-ciudadano',
  templateUrl: './subsanacion-informacion-ciudadano.component.html',
  styleUrls: ['./subsanacion-informacion-ciudadano.component.scss'],

})
export class SubsanacionInformacionCiudadanoComponent implements OnInit {
  formTitle: string;
  isDisabled: boolean = true;
  myFileArray: JsonFile[] = [];
  documentos: Array<any> = [];
  observacionesDocumentos: string;
  requisitosDocumentosaSubir = [];
  maxElement: number = 0;
  formData = this.fb.group({
    cedula: [{ value: null, disabled: true }, Validators.required],
    nacionalidad: [{ value: null, disabled: true }, Validators.required],
    nombre: [{ value: null, disabled: true }, Validators.required],
    primerapellido: [{ value: null, disabled: true }, Validators.required],
    segundoapellido: [{ value: null, disabled: true }, Validators.required],
    ciudad: [{ value: null, disabled: true }, Validators.required],
    telefono: [{ value: null, disabled: false }, Validators.required],
    direccion: [{ value: null, disabled: true }, Validators.required],
    fechaNacimiento: [{ value: null, disabled: true }, Validators.required],
    edad: [{ value: null, disabled: true }, Validators.required],
    foto: [null],
    pais: [{ value: null, disabled: true }, Validators.required],
    fechaSolicitud: [{ value: null, disabled: true }, Validators.required],
    estadoCivil: [{ value: null, disabled: true }, Validators.required],
    genero: [{ value: null, disabled: true }, Validators.required],
    correo: [{ value: null, disabled: true }, Validators.required],
    NrocarnetCONADIS: [{ value: null, disabled: false }],
    Discapacidad: [{ value: null, disabled: false }],
    PoseeDiscapacidad: [{ value: null, disabled: false }, Validators.required],
    ocupacion: [{ value: null, disabled: true }, Validators.required],
    nacionalidadId: [{ value: null, disabled: true }, Validators.required],
    TelefonoTrabajo: [{ value: null, disabled: false }, Validators.required],
    telefonoDomicilio: [{ value: null, disabled: false }, Validators.required],
    provinciaDomicilio: [{ value: null, disabled: true }, Validators.required],
    numeroPasaporte: [{ value: null, disabled: true }, Validators.required],
    fechaEmisionPasaporte: [{ value: null, disabled: true }, Validators.required],
    fechaExpiracionPasaporte: [{ value: null, disabled: true }, Validators.required],
    paisEmisionPasaporte: [{ value: null, disabled: true }, Validators.required],
    ciudadEmisionPasaporte: [{ value: null, disabled: false }, Validators.required],
    nombreCompleto: [{ value: null, disabled: true }, Validators.required],
    //fechaExpiracion:[null,Validators.required],      
    tipoVisa: [{ value: "", disabled: true }, Validators.required],
    numberVisa: [{ value: "", disabled: true }, Validators.required],
    fechaExpiracionVisa: [{ value: "", disabled: true }],
    fechaEmisionVisa: [{ value: "", disabled: true }],
    visaControl: [{ value: null, disabled: true }],
    ConfirmacionVisa: [{ value: "No", disabled: false }],
    select1: [{ value: null, disabled: true }, Validators.required],
    select2: [{ value: null, disabled: true }, Validators.required],
    select3: [{ value: null, disabled: true }, Validators.required],
    select4: [{ value: null, disabled: true }, Validators.required],
    numberMDG: [{ value: null, disabled: true }, Validators.required]
  });
  formDataSolicitante = this.fb.group({
    cedula: [{ value: null, disabled: true }, Validators.required],
    nacionalidad: [{ value: null, disabled: true }, Validators.required],
    nombreyapellido: [{ value: null, disabled: true }, Validators.required],
    ciudad: [{ value: null, disabled: true }, Validators.required],
    telefono: [{ value: null, disabled: true }, Validators.required],
    direccion: [{ value: null, disabled: true }, Validators.required],
    pais: [{ value: null, disabled: true }, Validators.required],
    NombreConsulado: [{ value: null, disabled: true }, Validators.required],
    PaisConsulado: [{ value: null, disabled: true }, Validators.required],
    edad: [{ value: null, disabled: true }, Validators.required],
    correo: [{ value: null, disabled: true }, Validators.required],
    numberMDG: [{ value: null, disabled: true }, Validators.required],
    tipoDocumentoIdentidad: [{ value: null, disabled: true }, Validators.required],
  });
  data: TramitesObj;
  visaTitular: boolean;
  observacionesDomicilio: string = "";
  observacionesDatosPersonales: string = '';
  observacionDomicilios: string;
  observacionMultas: string;
  observacionDocumentos: string;
  observacionSoportesGestion: string;
  entroSubsanacionObservaciones: boolean = false;

  movimientoActivo: MovimientoRequest;
  observacionesModel: any;
  observacionesObj: any = {};

  tabDataSourceMultas: Array<any> = [];

  constructor(private enviarDatosModalService: EnviarDatosModalService,
    private stepsSliderService: StepsSliderService,
    private configStateService: ConfigStateService,
    private servicioTramite: TramitesApiService,
    private fb: FormBuilder,
    private apiService: ApiServiceService,
    private servicioRequisito: RequisitosApiService,
    private confirmation: ConfirmationService) {

    let dataTemp = this.enviarDatosModalService.getData();
    
    this.formTitle = dataTemp.formTitle
    this.tabDataSourceMultas = dataTemp.multas;
    this.data = dataTemp.data as TramitesObj;
    let movimientoActivo = this.data.movimientos[this.data.movimientos.length - 1];
    this.observacionesDatosPersonales = movimientoActivo.observacionDatosPersonales;
    this.observacionesDomicilio = movimientoActivo.observacionDomicilios;

    // this.formData.get('ciudadEmisionPasaporte').setValidators(Validators.required);
    dataTemp.movimiento
    
    this.documentos = this.data.documentos;
    this.pathFormulario(this.data);

  }

  ngOnInit(): void {

  }

  onSubmit() {
    let movimiento = {} as MovimientoRequest;
    let data = this.data as TramitesObj;
    let currentUser = this.configStateService.getOne('currentUser');
    movimiento.tramiteId = data.id;
    movimiento.creatorId = currentUser.id;
    const optionsError: Partial<Confirmation.Options> = {
      hideCancelBtn: false,
      hideYesBtn: true,
      cancelText: 'Cerrar',
      yesText: 'Confirm',
      messageLocalizationParams: ['Demo'],
      titleLocalizationParams: [],
    };
    const optionsExito: Partial<Confirmation.Options> = {
      hideCancelBtn: true,
      hideYesBtn: false,
      cancelText: 'Cerrar',
      yesText: 'Aceptar',
      messageLocalizationParams: ['Demo'],
      titleLocalizationParams: [],
    };
    if (this.maxElement == this.myFileArray.length) {
      //==============Insertar Subsanacion====================================================
      let documentos: Documento[] = [];
      const _formData = new FormData();
      for (let i = 0; i < this.myFileArray.length; i++) {
        for (let j = 0; j < this.documentos.length; j++) {
          if (this.documentos[j].tipoDocumento == this.myFileArray[i].tipoDocumental) {
            const documento: Documento = {
              // id: "",
              nombre: this.myFileArray[i].file.name,
              ruta: "",
              observacion: "",
              tipoDocumento: this.myFileArray[i].tipoDocumental,
              DescripcionDocumento: this.documentos[j].DescripcionDocumento,
              IconoNombre: this.documentos[j].IconoNombre,
              ImagenNombre: this.documentos[j].ImagenNombre,
            }
            documentos.push(documento);
            _formData.append("mistramites", this.myFileArray[i].file);
            break;
          }
        }
      }

      let UltimoMovimientos = this.data.movimientos[this.data.movimientos.length - 1];
      const formulario: Subsanacion = {
        tramiteId: UltimoMovimientos.tramiteId,
        usuarioId: currentUser.id,
        beneficiarioDtoSubsanacion: {
          domicilio: {
            id: this.data.beneficiario.domicilio.id,
            telefonoCelular: this.formData.value.telefono,
            telefonoDomicilio: this.formData.value.telefonoDomicilio,
            telefonoTrabajo: this.formData.value.TelefonoTrabajo,
            pais: this.formData.controls["pais"].value,
          },
          pasaporte: {
            id: this.data.beneficiario.pasaporte.id,
            ciudadEmision: this.formData.value.ciudadEmisionPasaporte,
          },
          foto: this.formData.controls["foto"].value,
          carnetConadis: this.formData.controls["NrocarnetCONADIS"].value,
          porcentajeDiscapacidad: this.formData.controls["Discapacidad"].value,
          poseeDiscapacidad: this.formData.controls["PoseeDiscapacidad"].value == "No" ? false : true,
        },
        documentos: documentos,
        crearMovimientoRequest: {
          tramiteId: this.data.id,
          //estado: 3,
          estado: EstadoTramite.ValidarInformacion,
          observacionDatosPersonales: UltimoMovimientos.observacionDatosPersonales,
          observacionSoportesGestion: UltimoMovimientos.observacionSoportesGestion,
          observacionDomicilios: UltimoMovimientos.observacionDomicilios,
          observacionMovimientoMigratorio: UltimoMovimientos.observacionMovimientoMigratorio,
          observacionMultas: UltimoMovimientos.observacionMultas,
          fechaHoraCita: new Date().toISOString(),
          creatorId: currentUser.id,
        },
      };

      this.apiService.guardarSubsanacionTramite(formulario).subscribe(
        res => {
          //Subir documentacion     
          
          _formData.append("tramiteId ", res.id);
          this.servicioRequisito.grabarDocumentoZip(_formData).subscribe(
            res => this.confirmation.success('Se tramite está en proceso', 'Subsanación Exitosa', optionsExito),
            err => this.confirmation.error(err.message, 'Error', optionsError),
          );
        },
        err => this.confirmation.error(err.message, 'Error', optionsError),


      );

      //--------------------------------------------------------------------------------------
      this.enviarDatosModalService.copiarCiertasPropiedadesObj(movimiento, this.observacionesObj);
      // movimiento.estado = 18;
      movimiento.estado = EstadoTramite.ValidarInformacion;
      movimiento.estadoOrigen = EstadoTramite.SubsanacionInformacion;
      
      this.servicioTramite.crearMovimiento(movimiento).subscribe(
        res => this.confirmation.success('Se tramite está en proceso', 'Subsanación Exitosa', optionsExito),
        err => this.confirmation.error(err.message, 'Error', optionsError),
        () => console.log("Termino de subsanar y crear el movimiento")
      );

    }
    else {
      this.confirmation.warn("Todos los documentos son obligatorios", 'Validación', optionsError);
      return false;
    }
  }

  InformacionTexto(event) {
    this.observacionesDocumentos = event;
  }
  pathFormulario(data: TramitesObj) {
    this.stepsSliderService.setTipoImagen(data.beneficiario.foto);
    this.formDataSolicitante.patchValue({
      cedula: data.solicitante.identificacion,
      nacionalidad: data.solicitante.pais,
      nombreyapellido: data.solicitante.nombres,
      ciudad: data.solicitante.ciudad,
      telefono: data.solicitante.telefono,
      direccion: data.solicitante.direccion,
      pais: data.solicitante.pais,
      NombreConsulado: data.solicitante.consuladoNombre,
      PaisConsulado: data.solicitante.consuladoPais,
      edad: data.solicitante.edad,
      correo: data.solicitante.correo,
      numberMDG: "",
      tipoDocumentoIdentidad: data.solicitante.tipoIdentificacion
    });
    this.formData.patchValue({
      cedula: data.beneficiario.pasaporte.numero,
      nacionalidad: data.beneficiario.paisNacimiento,
      nacionalidadId: data.beneficiario.nacionalidadId,
      nombre: data.beneficiario.nombres,
      primerapellido: data.beneficiario.primerApellido,
      segundoapellido: data.beneficiario.segundoApellido,
      ciudad: data.beneficiario.ciudadNacimiento,
      telefono: data.beneficiario.domicilio.telefonoCelular,
      direccion: data.beneficiario.domicilio.direccion,
      fechaNacimiento: data.beneficiario.fechaNacimiento,
      edad: data.beneficiario.edad,
      pais: data.beneficiario.paisNacimiento,
      fechaSolicitud: data.fecha,
      estadoCivil: data.beneficiario.estadoCivil,
      foto: data.beneficiario.foto,
      genero: data.beneficiario.genero,
      correo: data.beneficiario.correo,
      NrocarnetCONADIS: data.beneficiario.carnetConadis,
      Discapacidad: data.beneficiario.porcentajeDiscapacidad,
      PoseeDiscapacidad: data.beneficiario.poseeDiscapacidad == false ? "No" : "Si",
      TelefonoTrabajo: data.beneficiario.domicilio.telefonoTrabajo,
      telefonoDomicilio: data.beneficiario.domicilio.telefonoDomicilio,
      ocupacion: data.beneficiario.ocupacion,
      provinciaDomicilio: data.beneficiario.domicilio.provincia,
      numeroPasaporte: data.beneficiario.pasaporte.numero,
      fechaEmisionPasaporte: data.beneficiario.pasaporte.fechaEmision,
      fechaExpiracionPasaporte: data.beneficiario.pasaporte.fechaExpiracion,
      paisEmisionPasaporte: data.beneficiario.pasaporte.paisEmision,
      ciudadEmisionPasaporte: data.beneficiario.pasaporte.ciudadEmision,
      nombreCompleto: data.beneficiario.nombres + " " + data.beneficiario.primerApellido + " " + data.beneficiario.segundoApellido,

      tipoVisa: data.beneficiario.visa.tipo,
      numberVisa: data.beneficiario.visa.numero,
      fechaExpiracionVisa: data.beneficiario.visa.fechaCaducidad,
      fechaEmisionVisa: data.beneficiario.visa.fechaConcesion,
      visaControl: data.beneficiario.visa.poseeVisa,
      ConfirmacionVisa: data.beneficiario.visa.confirmacionVisa,
      select1: data.calidadMigratoria,
      select2: data.grupo,
      select3: data.tipoVisa,
      select4: data.actividad,
      numberMDG: data.beneficiario.codigoMDG
    });
  }
  FileDocument(event: JsonFile) {
    this.maxElement = event.maxElement;
    let nombreAnterior = event.file.name;
    let extension = nombreAnterior.split(".").pop()
    let NombreActual = this.data.beneficiario.codigoMDG + "_" + event.tipoDocumental + "." + extension;
    const myNewFile = new File([event.file], NombreActual, { type: event.file.type });
    const miJson: JsonFile = {
      tipoDocumental: event.tipoDocumental,
      file: myNewFile
    }
    for (let i = 0; i < this.myFileArray.length; i++) {
      if (this.myFileArray[i].tipoDocumental == event.tipoDocumental) {
        this.myFileArray.splice(i, 1);
      }
    }
    this.myFileArray.push(miJson);
  }
}
