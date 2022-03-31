import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamiliarProcesoService, ChequeoPrevioInput, ValidarCodigoVerificacionInput } from '@mre/registro-persona/proxy/mre/sb/registro-persona/proceso';
import { SharepointMensajesApiService } from 'projects/mre/comunes/src/lib/services/sharepoint-mensajes-api/sharepoint-mensajes-api.service';
import { InfoContext } from '../../../modelos/models';
import { StepsSliderService } from '../../../services/ctrolUi/steps-slider.service';


@Component({
  selector: 'lib-enter-mdg',
  templateUrl: './enter-mdg.component.html',
  styleUrls: ['./enter-mdg.component.scss']
})
export class EnterMDGComponent implements OnInit {
  @Input() dataVisas: any = {};
  @Output() formGroupEmit = new EventEmitter<any>();
  @Output() stepperEmit = new EventEmitter<any>();
  @Output() InformacionTexto = new EventEmitter<string>();
  InfoContextMDG: InfoContext


  isMDGValidate: boolean = false;
  errorTextPreCheck: string;
  showPreCheckError = false;
  formData: FormGroup
  MDGData: FormGroup


  constructor(private fb: FormBuilder,
    private stepsSliderService: StepsSliderService,
    private ServiceFamiliarProceso: FamiliarProcesoService,
    private servicioSharepointMensaje: SharepointMensajesApiService
  ) {
    this.InfoContextMDG = {
      imagen: "../../../../../assets/images/infoContent.png",
      info: "Su número de registro del Ministerio de Gobierno, se encuentra ubicado en …. Del correo que le envió al momento de su registro en dicha institución."
    }

  }


  ngOnInit(): void {
    this.buildForm();
    this.servicioSharepointMensaje.obtenerMensajesInformativos("Visas", "AcuerdoDeCondiciones")
      .subscribe(data => {

        this.InformacionTexto.emit(data.Mensaje);
      });
  }

  buildForm() {
    this.formData = this.fb.group({
      numberMDG: [null, Validators.required],
      fechaNacimiento: [null, Validators.required]

    });
    this.MDGData = this.fb.group({

      codigoVerificacion: [null, Validators.required]
    });
  }

  validateMDG() {
    let temporalDate = this.formData.value.fechaNacimiento;

    // let myDate = new Date(temporalDate.year, temporalDate.month - 1, temporalDate.day);
    // let dateIso = myDate.toISOString();

    const sendData: ChequeoPrevioInput = {
      numeroRegistro: this.formData.value.numberMDG,
      fechaNacimiento: this.formData.value.fechaNacimiento
    };
    const request = this.ServiceFamiliarProceso.verificacionPrevia(sendData);

    request.subscribe(response => {
      this.errorTextPreCheck = response.error;
      this.showPreCheckError = !response.success;
      if (response.success === true) {

        this.EnviarCodigo();
        this.isMDGValidate = true;
      }
    });
  }

  EnviarCodigo() {
    const request = this.ServiceFamiliarProceso.enviarCodigoVerificacion(this.formData.value.numberMDG);
    request.subscribe(response => {
      this.errorTextPreCheck = response.error;
      this.showPreCheckError = !response.success;
      if (response.success === true) {

      }
    })
  }

  onSubmit() {

    const sendData: ValidarCodigoVerificacionInput = {
      numeroRegistro: this.formData.value.numberMDG,
      codigoVerificacion: this.MDGData.value.codigoVerificacion
    };
    const request = this.ServiceFamiliarProceso.validarCodigoVerificacion(sendData);
    request
      .subscribe(response => {
        this.errorTextPreCheck = response.error;
        this.showPreCheckError = !response.success;
        if (response.success === true) {
          this.ObtenerInformacionPersona();

        }
      });

  }

  ObtenerInformacionPersona() {
    const request = this.ServiceFamiliarProceso.obtenerInformacionPersona(this.formData.value.numberMDG);
    request.subscribe(response => {

      this.stepsSliderService.setPersonDto(response);
      this.stepsSliderService.setStatusStepHeader(2);
      this.stepsSliderService.getPersonDto();
      this.stepperEmit.emit(2);
      this.formGroupEmit.emit();

    });
  }

}
