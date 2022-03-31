import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepsSliderService } from '../../../services/ctrolUi/steps-slider.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { PersonaService } from '@mre/registro-persona/proxy/mre/sb/registro-persona/persona';
import { SharepointMensajesApiService } from 'projects/mre/comunes/src/lib/services/sharepoint-mensajes-api/sharepoint-mensajes-api.service';


@Component({
  selector: 'lib-tipo-de-visa',
  templateUrl: './tipo-de-visa.component.html',
  styleUrls: ['./tipo-de-visa.component.scss']
})
export class TipoDeVisaComponent implements OnInit {
  @Output() stepperEmit = new EventEmitter<any>();
  @Output() formGroupEmit = new EventEmitter<any>();
  @Output() InformacionTexto = new EventEmitter<string>();
  stepperNext: number = 0;

  formData = this.fb.group({
    typeVisa: ['Personal', Validators.required]
  });
  typeVisa: string = "Personal";
  ArrData = [
    { label: "Personal", name: "OptionName", tipoVisa: "Personal", descripcion: "Si usted es mayor de 18 años y de nacionalidad venezolana, seleccione esta opción.", color: "black" },
    { label: "Cónyuge no venezolano/a", name: "OptionName", tipoVisa: "Conyuge", descripcion: "Al seleccionar esta opción usted iniciará el trámite para su cónyuge/conviviente (no venezolano)", color: "black" },
    { label: "Hijo menor de edad/hijo de cualquier edad con discapacidad o bajo alguna dependencia", name: "OptionName", tipoVisa: "HijoMenorEdad", descripcion: "Al seleccionar esta opción usted iniciará el trámite para su hijo que tenga alguna discapacidad o dependencia.", color: "black" },

  ];
  constructor(private fb: FormBuilder,
    private stepsSliderService: StepsSliderService,
    private personaServicio: PersonaService,
    private servicioSharepointMensaje: SharepointMensajesApiService
  ) {
    this.actualizarTipoVisa("Personal");
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }

  ngOnInit(): void {
    this.servicioSharepointMensaje.obtenerMensajesInformativos("Visas", "TipoVisaImportante")
      .subscribe(data => {
        this.InformacionTexto.emit(data.Mensaje);
      });
  }

  actualizarTipoVisa(data: string) {
    this.formData.controls['typeVisa'].setValue(data);
    this.stepsSliderService.setTipoVisa(data);
    this.stepsSliderService.setTipoDocumento(data);
    this.stepsSliderService.setPersonalStatus();

    if (data == "Personal") {
      this.GetInfoPersonaActual();
      this.stepperNext = 2;

    }
    else
      this.stepperNext = 1;
  }

  onSubmit() {
    this.stepsSliderService.setStatusStepHeader(this.stepperNext);
    this.formGroupEmit.emit()
    this.stepperEmit.emit(this.stepperNext);
  }

  GetInfoPersonaActual() {

    this.personaServicio.obtenerPersonaActual().subscribe(response => {
      
      this.stepsSliderService.setTipoImagen(response.fotografiaBase64);
      this.stepsSliderService.setPersonDto(response);
      this.stepsSliderService.getPersonDto();

    });
  }

}
