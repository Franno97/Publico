import { ConfigStateService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonaDto } from '@mre/registro-persona/proxy/mre/sb/registro-persona/persona/models';
import { PersonaService } from '@mre/registro-persona/proxy/mre/sb/registro-persona/persona';

import { ClienteExternoService } from '@mre/registro-persona/proxy/mre/sb/registro-persona/proceso';
import { DatoVisa, formularioVisasFull, Visa } from '../../../modelos/models';

import { StepsSliderService } from '../../../services/ctrolUi/steps-slider.service';
import { ApiServiceService } from '../../../services/servi-api/api-service.service';
import { SharepointMensajesApiService } from 'projects/mre/comunes/src/lib/services/sharepoint-mensajes-api/sharepoint-mensajes-api.service';

@Component({
  selector: 'lib-formulario-de-solicitud',
  templateUrl: './fomulario-de-solicitud.component.html',
  styleUrls: ['./fomulario-de-solicitud.component.scss']
})
export class FomularioDeSolicitudComponent implements OnInit {
  @Output() stepperEmit = new EventEmitter<any>();
  @Output() formGroupEmit = new EventEmitter<any>();
  @Output() InformacionTexto = new EventEmitter<string>();
  dataSolicitante: PersonaDto;
  templateToShow: string = '';
  TipoSolicitud: string = "";
  personID: string = "";
  visa: Visa = {}

  formData = this.fb.group({
    cedula: [{ value: null, disabled: true }, Validators.required],
    nacionalidad: [{ value: null, disabled: true }, Validators.required],
    nombre: [{ value: null, disabled: true }, Validators.required],
    primerapellido: [{ value: null, disabled: true }, Validators.required],
    segundoapellido: [{ value: null, disabled: true }, Validators.required],
    foto: [null],
    ciudad: [{ value: null, disabled: true }, Validators.required],
    telefono: [{ value: null, disabled: true }, Validators.required],
    direccion: [{ value: null, disabled: true }, Validators.required],
    fechaNacimiento: [{ value: null, disabled: true }, Validators.required],
    ciudadNacimiento: [{ value: null }, Validators.required],
    edad: [{ value: null, disabled: true }, Validators.required],
    pais: [{ value: null, disabled: true }, Validators.required],
    fechaSolicitud: [{ value: null, disabled: true }, Validators.required],
    estadoCivil: [{ value: null, disabled: true }, Validators.required],
    genero: [{ value: null, disabled: true }, Validators.required],
    correo: [{ value: null, disabled: true }, Validators.required],
    NrocarnetCONADIS: [{ value: null, disabled: true }],
    Discapacidad: [{ value: null, disabled: true }],
    PoseeDiscapacidad: [{ value: null, disabled: false }, Validators.required],
    ocupacion: [{ value: null, disabled: true }, Validators.required],
    nacionalidadId: [{ value: null, disabled: true }, Validators.required],
    TelefonoTrabajo: [null],
    telefonoDomicilio: [null],
    provinciaDomicilio: [{ value: null, disabled: true }, Validators.required],
    numeroPasaporte: [{ value: null, disabled: true }, Validators.required],
    fechaEmisionPasaporte: [{ value: null, disabled: true }, Validators.required],
    fechaExpiracionPasaporte: [{ value: null, disabled: true }, Validators.required],
    paisEmisionPasaporte: [{ value: null, disabled: true }, Validators.required],
    ciudadEmisionPasaporte: [null],
    nombreCompleto: [{ value: null, disabled: true }, Validators.required],
    //fechaExpiracion:[null,Validators.required],      
    tipoVisa: [{ value: "", disabled: true }, Validators.required],
    numberVisa: [{ value: "", disabled: true }, Validators.required],
    fechaExpiracionVisa: [{ value: "", disabled: true }],
    fechaEmisionVisa: [{ value: "", disabled: true }],
    visaControl: [{ value: null, disabled: true }],
    ConfirmacionVisa: [{ value: "No", disabled: false }],
    PersonaId: [{ value: null, disabled: true }],
    select1: [null, Validators.required],
    select2: [null, Validators.required],
    select3: [null, Validators.required],
    select4: [null, Validators.required],
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

  constructor(private fb: FormBuilder,
    private stepsSliderService: StepsSliderService,
    private ApiServicio: ApiServiceService,
    private personaServicio: PersonaService,
    private configStateService: ConfigStateService,
    private clienteExternoService: ClienteExternoService,
    private confirmation: ConfirmationService,
    private servicioSharepointMensaje: SharepointMensajesApiService
  ) {
    this.GetInfoPersonaActual();

  }

  ngOnInit(): void {

    this.stepsSliderService.getPersonDt$().subscribe(data => {

      this.TipoSolicitud = this.stepsSliderService.getTipoVisa();
      this.buildFormBeneficiario(data);
    });

    this.servicioSharepointMensaje.obtenerMensajesInformativos("Visas", "FormularioInfoGeneral")
      .subscribe(data => {
        this.InformacionTexto.emit(data.Mensaje);
      });
    //  
  }

  pathFormSolicitante(personalData: PersonaDto) {
    let unidadadmin = this.stepsSliderService.getUnidadAdministrativa() as any;
    
    const fechaNaciminto = new Date(personalData.fechaNacimiento);
    var timeDiff = Math.abs(Date.now() - fechaNaciminto.getTime());
    var edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    this.formDataSolicitante.patchValue({
      cedula: personalData.numeroDocumentoIdentidad,
      nacionalidad: personalData.paisNacimiento,
      nombreyapellido: personalData.nombre + " " + personalData.primerApellido + " " + personalData.segundoApellido,
      ciudad: personalData.ciudad,
      telefono: personalData.telefono,
      direccion: personalData.direccion,
      pais: personalData.paisNacimiento,
      NombreConsulado: unidadadmin.oficinaConsular,
      PaisConsulado: unidadadmin.paisConsular,
      edad: edad,
      correo: personalData.correoElectronico,
      numberMDG: personalData.numeroRegistroPermanencia,
      tipoDocumentoIdentidad: personalData.tipoDocumentoIdentidad
    })

  }

  buildFormBeneficiario(personalData: PersonaDto) {
    const dateActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const fechaEmisionPasaporte = new Date(personalData.documentoIdentidadFechaEmision).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const fechaExpiracionPasaporte = new Date(personalData.documentoIdentidadFechaExpiracion).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const fechaNacimiento = new Date(personalData.fechaNacimiento).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let fechaExpiracionVisa = new Date(personalData.visaFechaExpiracion).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let fechaEmisionVisa = new Date(personalData.visaFechaEmision).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });

    let visaControl = 'No';
    let confirmacionVisa = 'No';
    let numberVisa = '';
    let tipoVisa = '';

    this.ApiServicio.GetCatalogoNacionalidad("NACIONALIDAD", personalData.nacionalidadesId)
      .subscribe(response => {
        const d = new Date(personalData.fechaNacimiento);
        const mm = String(d.getMonth() + 1).padStart(2, '0');;
        const dd = String(d.getDate()).padStart(2, '0');
        const yy = d.getFullYear();

        const dataVisa: DatoVisa = {
          nombres: personalData.nombre,
          primerApellido: personalData.primerApellido,
          segundoApellido: personalData.segundoApellido,
          idNacionalidad: response.result.codigoEsigex,
          fechaNacimiento: yy + "-" + mm + "-" + dd,
          usuario: "mremhprueba",
          contrasenia: "prueba"
        };

        this.ApiServicio.buscarVisaPorNombre(dataVisa)
          .subscribe(response => {
            if (response.LisDatosVisa.length > 0) {
              visaControl = "Si";
              confirmacionVisa = "Si";
              fechaExpiracionVisa = response.LisDatosVisa[0].FechaCaducidad;
              fechaEmisionVisa = response.LisDatosVisa[0].FechaConcesion;
              numberVisa = response.LisDatosVisa[0].NumeroVisa;
              tipoVisa = response.LisDatosVisa[0].NombreActoConsularVisa;

              this.visa.fechaCaducidad = response.LisDatosVisa[0].FechaCaducidad;
              this.visa.fechaConcesion = response.LisDatosVisa[0].FechaConcesion;
              this.visa.numero = response.LisDatosVisa[0].NumeroVisa;
              this.visa.poseeVisa = true;
              this.visa.tipo = response.LisDatosVisa[0].NombreActoConsularVisa;
              this.visa.confirmacionVisa = true;
              this.visa.estadoVisa = response.LisDatosVisa[0].EstadoVisa;
              this.visa.idActoConsularVisa = response.LisDatosVisa[0].IdActoConsularVisa;
              this.visa.idCentroAdministrativo = response.LisDatosVisa[0].IdCentroAdministrativo;
              this.visa.idPersona = response.LisDatosVisa[0].IdPersona;
              this.visa.idTramite = response.LisDatosVisa[0].IdTramite;
              this.visa.nombreActoConsularVisa = response.LisDatosVisa[0].NombreActoConsularVisa;
              this.visa.nombreCentroAdministrativo = response.LisDatosVisa[0].NombreCentroAdministrativo;
              this.visa.nombres = response.LisDatosVisa[0].Nombres;
              this.visa.numeroPasaporte = response.LisDatosVisa[0].NumeroPasaporte;
              this.visa.numeroVisa = response.LisDatosVisa[0].NumeroVisa;
              this.visa.primerApellido = response.LisDatosVisa[0].PrimerApellido;
              this.visa.segundoApellido = response.LisDatosVisa[0].SegundoApellido;

            }

            const timeDiff = Math.abs(Date.now() - new Date(personalData.fechaNacimiento).getTime());
            const edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
            this.stepsSliderService.setTipoImagen(personalData.fotografiaBase64);

            
            this.personID = personalData.id;
            this.formData.patchValue({
              PersonaId: personalData.id,
              foto: personalData.fotografiaBase64,
              cedula: personalData.numeroDocumentoIdentidad,
              tipoDocumentoIdentidadId: personalData.tipoDocumentoIdentidadId,
              nacionalidad: personalData.nacionalidadesNombre,
              nacionalidadId: personalData.nacionalidadesId,
              nombre: personalData.nombre,
              primerapellido: personalData.primerApellido,
              segundoapellido: personalData.segundoApellido,
              ciudad: personalData.ciudad,
              telefono: personalData.telefono,
              direccion: personalData.direccion,
              ciudadNacimiento: '',
              fechaNacimiento: fechaNacimiento,
              edad: edad,
              pais: personalData.paisNacimiento,
              fechaSolicitud: dateActual,
              estadoCivil: personalData.estadoCivil,
              genero: personalData.genero,
              correo: personalData.correoElectronico,
              NrocarnetCONADIS: null,
              Discapacidad: null,
              PoseeDiscapacidad: "No",
              TelefonoTrabajo: null,
              telefonoDomicilio: null,
              ocupacion: personalData.ocupacion,
              provinciaDomicilio: personalData.region,
              numeroPasaporte: personalData.numeroDocumentoIdentidad,
              fechaEmisionPasaporte: fechaEmisionPasaporte,
              fechaExpiracionPasaporte: fechaExpiracionPasaporte,
              paisEmisionPasaporte: personalData.documentoIdentidadPaisEmisionNombre,
              ciudadEmisionPasaporte: null,
              nombreCompleto: personalData.nombre + " " + personalData.primerApellido + " " + personalData.segundoApellido,
              //fechaExpiracion:[null,Validators.required],      
              tipoVisa: tipoVisa,
              numberVisa: numberVisa,
              fechaExpiracionVisa: fechaExpiracionVisa,
              fechaEmisionVisa: fechaEmisionVisa,
              visaControl: visaControl,
              ConfirmacionVisa: confirmacionVisa,

              numberMDG: personalData.origenId
            });

            

          });
      });

  }

  setValueToSwitch(data: string) {
    //llamar carnet Conadis service
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
      yesText: 'Continuar.',
      messageLocalizationParams: ['Demo'],
      titleLocalizationParams: [],
    };

    if (data == "lib-datos-personales") {
      this.formData.get('ciudadEmisionPasaporte').clearValidators();
      this.formData.get('telefonoDomicilio').clearValidators();
      this.formData.get('TelefonoTrabajo').clearValidators();
      this.servicioSharepointMensaje.obtenerMensajesInformativos("Visas", "FormularioInfoGeneral").subscribe(data => {
        this.InformacionTexto.emit(data.Mensaje);
      });
    }
    else {
      this.formData.get('ciudadEmisionPasaporte').setValidators(Validators.required);
      this.formData.get('telefonoDomicilio').setValidators(Validators.required);
      this.formData.get('TelefonoTrabajo').setValidators(Validators.required);

      if (this.formData.controls["PoseeDiscapacidad"].value != "No") {
        const request = this.clienteExternoService.consultarDiscapacidad(this.formData.controls["NrocarnetCONADIS"].value);
        request.subscribe(

          res => {
            
            if (res.codigoConadis != null) {
              if (res.porcentajeDiscapacidad != (this.formData.controls["Discapacidad"].value)) {
                this.confirmation.warn('El porcentaje de discapacidad no coincide de click en continuar ', 'Comprobando Discapacidad', optionsExito);
              }

            }
            else {
              this.confirmation.warn('No existe Discapacidad registrada en el sistema', 'Comprobando Discapacidad', optionsExito);
            }

          },
          err => this.confirmation.error(err.message, 'Error en servicio', optionsError),
        );
      }

      this.servicioSharepointMensaje.obtenerMensajesInformativos("Visas", "FormularioInfoDocumentos").subscribe(data => {
        this.InformacionTexto.emit(data.Mensaje);
      });
    }

    this.templateToShow = data;
  }

  onSubmit() {
    const currentUser = this.configStateService.getOne("currentUser");
    const idUser = currentUser.id;
    const unidadadmin = this.stepsSliderService.getUnidadAdministrativa() as any;

    const formulario: formularioVisasFull = {
      unidadAdministrativaIdCEV: unidadadmin.IdUnidadAministrativa,
      actividad: this.formData.controls['select4'].value,
      calidadMigratoria: this.formData.controls['select1'].value,
      grupo: this.formData.controls['select2'].value,
      tipoVisa: this.formData.controls['select3'].value,
      servicioId: unidadadmin.IdServicio,
      codigoPais: unidadadmin.IdcodePais,
      PersonaId: this.personID,

      beneficiario: {
        tipoCiudadano: this.TipoSolicitud == "Personal" ? 0 : this.TipoSolicitud == "Conyuge" ? 1 : 2,
        ciudadNacimiento: this.formData.controls["ciudadNacimiento"]?.value,
        codigoMDG: this.formData.controls["numberMDG"]?.value,
        correo: this.formData.controls["correo"]?.value,
        ocupacion: this.formData.controls["ocupacion"]?.value,
        edad: this.formData.controls["edad"]?.value,
        domicilio: {
          ciudad: this.formData.controls["ciudad"]?.value,
          direccion: this.formData.controls["direccion"]?.value,
          pais: this.formData.controls["pais"]?.value,
          provincia: this.formData.controls["provinciaDomicilio"]?.value,
          telefonoCelular: this.formData.controls["telefono"]?.value,
          telefonoDomicilio: this.formData.controls["telefonoDomicilio"]?.value,
          telefonoTrabajo: this.formData.controls["TelefonoTrabajo"]?.value
        },
        estadoCivil: this.formData.controls["estadoCivil"]?.value,
        fechaNacimiento: this.FormatearFecha(this.formData.controls["fechaNacimiento"]?.value).toISOString(),//"2022-01-07T13:23:53.595Z",
        foto: this.formData.controls["foto"].value, //this.stepsSliderService.getImagen(),
        genero: this.formData.controls["genero"]?.value,
        nacionalidad: this.formData.controls["nacionalidad"]?.value.toString(),
        nacionalidadId: this.formData.controls["nacionalidadId"]?.value.toString(),
        nombres: this.formData.controls["nombre"]?.value,
        paisNacimiento: this.formData.controls["pais"]?.value,
        pasaporte: {
          ciudadEmision: this.formData.controls["ciudadEmisionPasaporte"]?.value,
          fechaEmision: this.FormatearFecha(this.formData.controls["fechaEmisionPasaporte"]?.value).toISOString(),
          fechaExpiracion: this.FormatearFecha(this.formData.controls["fechaExpiracionPasaporte"]?.value).toISOString(),
          fechaNacimiento: this.FormatearFecha(this.formData.controls["fechaNacimiento"]?.value).toISOString(),
          nombres: this.formData.controls["nombreCompleto"]?.value,
          numero: this.formData.controls["numeroPasaporte"]?.value,
          paisEmision: this.formData.controls["paisEmisionPasaporte"]?.value,
          tipoDocumentoIdentidadId: this.formData.controls["tipoDocumentoIdentidadId"]?.value
        },
        porcentajeDiscapacidad: this.formData.controls["Discapacidad"].value == null ? 0 : parseInt(this.formData.controls["Discapacidad"].value),
        poseeDiscapacidad: this.formData.controls["PoseeDiscapacidad"].value == "No" ? false : true,
        carnetConadis: this.formData.controls["NrocarnetCONADIS"].value == null ? " " : this.formData.controls["NrocarnetCONADIS"].value,
        primerApellido: this.formData.controls["primerapellido"]?.value,
        segundoApellido: this.formData.controls["segundoapellido"]?.value,
        visa: this.visa,
      },
      documentos: [
        {
          nombre: "",
          ruta: "",
          observacion: "",
          tipoDocumento: "",
          DescripcionDocumento: "",
          IconoNombre: "",
          ImagenNombre: "",
        }
      ],
      solicitante: {
        identificacion: this.formDataSolicitante.controls["cedula"].value,
        tipoIdentificacion: this.formDataSolicitante.controls["tipoDocumentoIdentidad"].value,
        cedula: this.formDataSolicitante.controls["cedula"]?.value,
        ciudad: this.formDataSolicitante.controls["ciudad"]?.value,
        consuladoNombre: this.formDataSolicitante.controls["NombreConsulado"]?.value,
        consuladoPais: this.formDataSolicitante.controls["PaisConsulado"]?.value,
        direccion: this.formDataSolicitante.controls["direccion"]?.value,
        edad: parseInt(this.formDataSolicitante.controls["edad"].value),
        correo: this.formDataSolicitante.controls["correo"]?.value,
        nacionalidad: this.formDataSolicitante.controls["nacionalidad"].value,
        nombres: this.formDataSolicitante.controls["nombreyapellido"].value,
        pais: this.formDataSolicitante.controls["pais"].value,
        telefono: this.formDataSolicitante.controls["telefono"]?.value,
      },
      usuarioId: idUser
    };

    this.formGroupEmit.emit(formulario);

    this.stepsSliderService.setStatusStepHeader(3);
    this.stepperEmit.emit(3);

  }

  FormatearFecha(fecha: string) {
    let temp = fecha.split('/');
    return new Date(temp[2] + "-" + temp[1] + "-" + temp[0]);
  }

  GetInfoPersonaActual() {
    this.personaServicio.obtenerPersonaActual().subscribe(response => {
      this.dataSolicitante = response;
      this.pathFormSolicitante(response);
    });
  }

}
