import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PersonaDto } from '@mre/registro-persona/proxy/mre/sb/registro-persona/persona/models';
import { RegistroPersonaProcesoService, ChequeoPrevioInput, ValidarCodigoVerificacionInput } from '@mre/registro-persona/proxy/mre/sb/registro-persona/proceso';
import { PersonaConfiguracionService } from '@mre/registro-persona/proxy/mre/sb/registro-persona/persona';

import { finalize } from 'rxjs/operators';

import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { AuthService, LocalizationService, ConfigStateService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { NgbDateCustomParserFormatter } from '../../../compartido/ngb-date-custom-parser-formatter';

@Component({
  selector: 'lib-person-registration-process-precheck',
  templateUrl: './person-registration-process-precheck.component.html',
  styleUrls: ['./person-registration-process-precheck.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class PersonRegistrationProcessPrecheckComponent implements OnInit {

  imagePersonMdgUrl: string;
  importantImageUrl: string;
  ayudaRegistroUrl: string;
  stageMessage: string;

  maxDate = { year: new Date().getUTCFullYear(), month: (new Date().getMonth() + 1), day: new Date().getDate() };
  minDate = { year: new Date().getUTCFullYear() - 100, month: 12, day: 31 };

  showFirstSection = true;
  showDataSection = false;
  form: FormGroup;
  showPreCheckError = false;
  errorTextPreCheck: string;
  showSectionValidateCode = false;
  registerNumber: string;

  formCode: FormGroup;

  formPersonalData: FormGroup;

  finalSectionAccept = false;
  finalSectionReject = false;
  errorSection = false;
  errorSectionMessage: string;

  personalData: PersonaDto;

  imagePhoto: string;
  imageFingerPrint: string;

  procesando = false;
  mostrarCaptcha: Observable<boolean> = null;
  isRegisterHelpOpen = false;

  constructor(
    private location: Location,
    private personRegistrationProcessService: RegistroPersonaProcesoService,
    private fb: FormBuilder,
    private personaConfiguracionService: PersonaConfiguracionService,
    private authService: AuthService,
    private confirmation: ConfirmationService,
    private localizationService: LocalizationService,
    private config: ConfigStateService
  ) { }

  ngOnInit(): void {
    this.imagePersonMdgUrl = location.origin + '/assets/mdg-info-01.png';
    this.importantImageUrl = location.origin + '/assets/important-icon-01.png';
    this.ayudaRegistroUrl = location.origin + '/assets/ayuda-registro-01.png';
    this.stageMessage = this.localizationService.instant('PersonRegistration::PersonRegistration:ValidarInformacion');
    this.buildForm();
  }

  buildForm() {
    const configRequest = this.personaConfiguracionService.obtener();
    configRequest.subscribe(response => {
      this.mostrarCaptcha = of(response.habilitarCaptcha);

      if (response.habilitarCaptcha) {
        this.form = this.fb.group({
          registerNumber: [null, [Validators.required, Validators.maxLength(10)]],
          birthDate: [null, [Validators.required]],
          recaptchaReactive: new FormControl(null, [Validators.required])
        });
      } else {
        this.form = this.fb.group({
          registerNumber: [null, [Validators.required, Validators.maxLength(10)]],
          birthDate: [null, [Validators.required]],
          recaptchaReactive: new FormControl(null)
        });
      }
    });


  }

  validatePrecheck() {
    this.errorTextPreCheck = '';
    this.showPreCheckError = false;
    this.showSectionValidateCode = false;
    this.registerNumber = '';

    if (this.form.invalid) {
      return;
    }

    this.procesando = true;

    let temporalDate: NgbDateStruct = this.form.controls.birthDate.value;
    let myDate = new Date(temporalDate.year, temporalDate.month - 1, temporalDate.day);
    let dateIso = myDate.toISOString();

    const sendData: ChequeoPrevioInput = {
      numeroRegistro: this.form.controls.registerNumber.value,
      fechaNacimiento: dateIso
    };

    this.registerNumber = sendData.numeroRegistro;

    const request = this.personRegistrationProcessService.verificacionPrevia(sendData);
    request
      .pipe(finalize(() => (this.procesando = false)))
      .subscribe(response => {
        this.errorTextPreCheck = response.error;
        this.showPreCheckError = !response.success;
        if (response.success === true) {
          this.sendGenerateCode();
        }
      });
  }

  closeErrorWindows() {
    this.showPreCheckError = false;
  }

  sendGenerateCode() {
    this.procesando = true;

    const request = this.personRegistrationProcessService.enviarCodigoVerificacion(this.registerNumber);

    request.pipe(finalize(() => (this.procesando = false)))
    .subscribe(response => {
      this.errorTextPreCheck = response.error;
      this.showPreCheckError = !response.success;
      if (response.success === true) {
        this.showFirstSection = false;
        this.stageMessage = this.localizationService.instant('PersonRegistration::PersonRegistration:CodigoVerificacion');
        this.showSectionValidateCode = true;
        this.buildFormCode();
      }
    });

  }

  buildFormCode() {
    this.formCode = this.fb.group({
      verificationCode: [null, [Validators.required, Validators.maxLength(6)]],
      terms: ['', Validators.requiredTrue],
    });
  }

  validateCode() {
    this.errorTextPreCheck = '';

    if (this.formCode.invalid) {
      return;
    }

    this.procesando = true;

    const sendData: ValidarCodigoVerificacionInput = {
      numeroRegistro: this.registerNumber,
      codigoVerificacion: this.formCode.controls.verificationCode.value
    };

    const request = this.personRegistrationProcessService.validarCodigoVerificacion(sendData);

    request
      .pipe(finalize(() => (this.procesando = false)))
      .subscribe(response => {
        this.errorTextPreCheck = response.error;
        this.showPreCheckError = !response.success;
        if (response.success === true) {
          this.showSectionValidateCode = false;
          this.showFirstSection = false;

          this.getPersonalData();
        }
      });

  }

  getPersonalData() {
    const request = this.personRegistrationProcessService.obtenerInformacionPersona(this.registerNumber);

    request.subscribe(response => {

      this.errorSectionMessage = response.error;
      this.errorSection = !response.success;

      if (response.success === true) {
        this.personalData = response.personaDto;
        this.buildFormPersonalData(response.personaDto);
        this.stageMessage = this.localizationService.instant('PersonRegistration::PersonRegistration:InformacionCiudadano');
        this.showDataSection = true;
      }

    });
  }

  buildFormPersonalData(personalData: PersonaDto) {
    this.imagePhoto = personalData.fotografiaBase64;
    this.imageFingerPrint = personalData.huellasDactilaresBase64;
    this.formPersonalData = this.fb.group({
      names: new FormControl({ value: personalData.nombre, disabled: true }),
      firstSurname: new FormControl({ value: personalData.primerApellido, disabled: true }),
      secondSurname: new FormControl({ value: personalData.segundoApellido, disabled: true }),
      birthDate: new FormControl({ value: this.convertIsoTextDateToText(personalData.fechaNacimiento), disabled: true }),
      birthCountry: new FormControl({ value: personalData.paisNacimiento, disabled: true }),
      nationality: new FormControl({ value: personalData.paisNacimiento, disabled: true }),
      email: new FormControl({ value: personalData.correoElectronico, disabled: true }),
      hasIdentityDocument: new FormControl({ value: personalData.poseeDocumentoIdentidadTexto, disabled: true }),
      identityDocumentType: new FormControl({ value: personalData.tipoDocumentoIdentidad, disabled: true }),
      identityDocumentNumber: new FormControl({ value: personalData.numeroDocumentoIdentidad, disabled: true }),
      identityDocumentEmissionCountry: new FormControl({ value: personalData.documentoIdentidadPaisEmisionNombre, disabled: true }),
      identityDocumentEmissionDate: new FormControl({ value: this.convertIsoTextDateToText(personalData.documentoIdentidadFechaEmision), disabled: true }),
      identityDocumentExpirationDate: new FormControl({ value: this.convertIsoTextDateToText(personalData.documentoIdentidadFechaExpiracion), disabled: true }),
      gender: new FormControl({ value: personalData.genero, disabled: true }),
      maritalStatus: new FormControl({ value: personalData.estadoCivil, disabled: true }),
      phoneNumber: new FormControl({ value: personalData.telefono, disabled: true }),
      address: new FormControl({ value: personalData.direccion, disabled: true }),
      region: new FormControl({ value: personalData.region, disabled: true }),
      city: new FormControl({ value: personalData.ciudad, disabled: true }),
      visaNumber: new FormControl({ value: personalData.numeroVisa, disabled: true }),
      visaType: new FormControl({ value: personalData.tipoVisa, disabled: true }),
      visaEmissionDate: new FormControl({ value: this.convertIsoTextDateToText(personalData.visaFechaEmision), disabled: true }),
      visaExpirationDate: new FormControl({ value: this.convertIsoTextDateToText(personalData.visaFechaExpiracion), disabled: true }),
      educationLevel: new FormControl({ value: personalData.nivelEducativo, disabled: true }),
      profession: new FormControl({ value: personalData.profesion, disabled: true }),
      occupation: new FormControl({ value: personalData.ocupacion, disabled: true }),
      permanenceRecordNumber: new FormControl({ value: personalData.numeroRegistroPermanencia, disabled: true }),
      countryEntryDate: new FormControl({ value: personalData.fechaIngresoPais, disabled: true }),
      regularPointAccess: new FormControl({ value: personalData.ingresoPuntoRegularTexto, disabled: true }),
      lastResidenceCountry: new FormControl({ value: personalData.paisResidenciaPreviaTexto, disabled: true }),

    });
  }

  convertIsoTextDateToText(textDate: string): string {
    if (textDate != null && textDate != '') {
      const date = new Date(textDate);
      const result = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
      return result;
    } else {
      return '';
    }

  }

  sendRegisterPerson() {
    if (this.formPersonalData.invalid) {
      return;
    }

    this.procesando = true;

    const request = this.personRegistrationProcessService.registrarPersona(this.registerNumber);

    request
      .pipe(finalize(() => (this.procesando = false)))
      .subscribe(response => {
        this.showDataSection = false;
        this.errorSectionMessage = response.error;
        this.errorSection = !response.success;

        if (response.success === true) {
          this.stageMessage = this.localizationService.instant('PersonRegistration::PersonRegistration:RegistroFinalizado');
          this.finalSectionAccept = true;
        }
      });

  }

  showConfirmationReject() {
    const confirmationStatus$ = this.confirmation.warn('Está seguro de rechazar el registro', '¿Rechazar registro?')
      .subscribe((status: Confirmation.Status) => {
        if (status == Confirmation.Status.confirm) {
          this.sendRejectNotification();
        }
      });
  }

  sendRejectNotification() {
    this.procesando = true;
    const request = this.personRegistrationProcessService.rechazarRegistro(this.registerNumber);

    request
      .pipe(finalize(() => (this.procesando = false)))
      .subscribe(response => {
        this.showFinalSectionReject();
      });
  }

  showFinalSectionReject() {
    this.showDataSection = false;
    this.stageMessage = this.localizationService.instant('PersonRegistration::PersonRegistration:RegistroRechazado');
    this.finalSectionReject = true;
  }

  login() {
    this.authService.navigateToLogin();
  }

  showRegisterHelp() {

  }

  return() {
    this.finalSectionReject = false;
    this.errorSection = false
    this.form.controls.registerNumber.setValue(null);
    this.form.controls.birthDate.setValue(null);
    this.stageMessage = this.localizationService.instant('PersonRegistration::PersonRegistration:ValidarInformacion');
    this.showFirstSection = true;
  }
}