import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { StepsSliderService } from '../../services/ctrolUi/steps-slider.service';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { formularioVisasFull } from '../../modelos/models';
import { SharepointMensajesApiService } from 'projects/mre/comunes/src/lib/services/sharepoint-mensajes-api/sharepoint-mensajes-api.service';

@Component({
  selector: 'lib-visas',
  templateUrl: './visas.component.html',
  styleUrls: ['./visas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VisasComponent implements OnInit, OnChanges {
  @Input() dataVisas: any = {};
  @Input() InformacionTexto: any = "";;

  private _testId: any;
  @Input() clickStepper: Array<number> = [];
  mensaje: string;
  requisitosDocumentosaSubir = []
  firstFormGroup: FormGroup = {} as FormGroup;
  secondFormGroup: FormGroup = {} as FormGroup;
  thirdFormGroup: FormGroup = {} as FormGroup;
  fourFormGroup: FormGroup = {} as FormGroup;
  stepperHeader: any = [];
  informacion: string = "";
  informacionMDGVisa: string = "";
  informacionGeneralVisa: string = "";
  informacionAdjuntos: string = "";
  formularioFull: formularioVisasFull;
  inicioMostrarFormularioSubirArchivo = false;

  constructor(
    private fb: FormBuilder,
    private config: NgbModalConfig,
    private stepsSliderService: StepsSliderService,
    private servicioSharepointMensaje: SharepointMensajesApiService
  ) {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.config.centered = true;
    this.config.size = 'sm';

  }

  assigFormToStep(data: any, val: number) {
    switch (val) {
      case 1:
        this.firstFormGroup = data as FormGroup;

        break;
      case 2:

        this.secondFormGroup = data as FormGroup;

        break;
      case 3:
        this.thirdFormGroup = data as FormGroup;
        this.formularioFull = data;
        this.formularioFull.calidadMigratoriaId = data.calidadMigratoria;
        this.formularioFull.tipoConvenioId = data.grupo;
        this.formularioFull.tipoVisaId = data.tipoVisa;
        this.formularioFull.actividadId = data.actividad;

        this.servicioSharepointMensaje.obtenerTiposDocumentosPorTipo(this.stepsSliderService.getTipoDocumento())
          .subscribe(data1 => {

            this.requisitosDocumentosaSubir = [];
            for (let i = 0; i < data1.length; i++) {

              let item = {
                CodigoImagenDocumento: data1[i].CodigoImagenDocumento,
                CodigoTipo: data1[i].CodigoTipo,
                Edad: data1[i].Edad,
                Habilitado: data1[i].Habilitado,
                IconoNombre: data1[i].IconoNombre,
                ImagenNombre: data1[i].ImagenNombre,
                Mensaje: data1[i].Mensaje,
                Obligatorio: data1[i].Obligatorio,
                Requisito: data1[i].Requisito,
                TipoDocumental: data1[i].TipoDocumental,
                TipoDocumento: data1[i].TipoDocumento,
                Title: data1[i].Title,
                IsVisible: false,
                VisorPdf: ""
              };
              this.requisitosDocumentosaSubir.push(item);
            }
            if (this.formularioFull.beneficiario.poseeDiscapacidad == true) {
              let item = {
                CodigoImagenDocumento: null,
                CodigoTipo: "CON",
                Edad: 0,
                Habilitado: true,
                IconoNombre: "fas fa-file-contract",
                ImagenNombre: "Discapacidad.png",
                Mensaje: "OK",
                Obligatorio: false,
                Requisito: null,
                TipoDocumental: "COND",
                TipoDocumento: "Carnet de conadis",
                Title: "Conadis",
                IsVisible: false,
                VisorPdf: ""
              };
              this.requisitosDocumentosaSubir.push(item);
            }

          });

        break;
      case 4:
        {
          this.fourFormGroup = data as FormGroup;

          break;
        }
    }

  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

  lop() {

  }
  clickNext(data: any) {
    this.clickStepper[0] = data;
  }

  // Cuando se cambia la pestaña del componente de pasos a seguir
  cambioPestana(dato: any): void {
    this.inicioMostrarFormularioSubirArchivo = dato.selectedIndex === 3;
  }

  InformacionLateral(event, componente) {
    // this.informacion=event;    
    switch (componente) {
      case 'aviso':
        this.informacion = event;
        break;
      case 'mdg':
        this.informacionMDGVisa = event;
        break;
      case 'general':
        this.informacionGeneralVisa = event;
        break;
      case 'adjuntos':
        this.informacionAdjuntos = event;
        break;
    }
  }
}
