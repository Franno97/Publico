import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InfoContext } from 'projects/mre/visas-ecuador/src/lib/modelos/models';
import { StepsSliderService } from 'projects/mre/visas-ecuador/src/lib/services/ctrolUi/steps-slider.service';
import { TramitesApiService } from '../../services/tramites-api/tramites-api.service';

@Component({
  selector: 'lib-datos-beneficiario',
  templateUrl: './datos-beneficiario.component.html',
  styleUrls: ['./datos-beneficiario.component.scss']
})
export class DatosBeneficiarioComponent implements OnInit {
  @Output() formGroupEmit = new EventEmitter<any>();
  @Input() formData: FormGroup;
  InfoContext: InfoContext;
  urlimagen: string;
  arrField1 = [
    { placeHolder: "Fecha de Solicitud", typeInput: "text", formCtrolName: "fechaSolicitud", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Primer Apellido", typeInput: "text", formCtrolName: "primerapellido", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Segundo Apellido", typeInput: "text", formCtrolName: "segundoapellido", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Nombre Completo", typeInput: "text", formCtrolName: "nombre", icon: "fas fa-user-circle", contentInfo: false },
  ];
  arrField2 = [
    { placeHolder: "Número registro MDG", typeInput: "text", formCtrolName: "numberMDG", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Pais de nacimiento", typeInput: "text", formCtrolName: "pais", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Ciudad nacimiento", typeInput: "text", formCtrolName: "ciudadNacimiento", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Fecha nacimiento", typeInput: "text", formCtrolName: "fechaNacimiento", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Edad", typeInput: "text", formCtrolName: "edad", icon: "fas fa-user-circle", contentInfo: false }

  ];
  arrField3 = [
    { placeHolder: "Estado civil", typeInput: "text", formCtrolName: "estadoCivil", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Nacionalidad", typeInput: "text", formCtrolName: "nacionalidad", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Género", typeInput: "text", formCtrolName: "genero", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Correo electrónico", typeInput: "text", formCtrolName: "correo", icon: "fas fa-user-circle", contentInfo: false }
  ];
  arrField4 = [

    { selectName: "Calidad migratoria", control: "select1", arrOptionSelect: [] },
    { selectName: "Grupo", control: "select2", arrOptionSelect: [] },
    { selectName: "Tipo de visa", control: "select3", arrOptionSelect: [] },
    { selectName: "Actividad a desarrollar", control: "select4", arrOptionSelect: [] },


  ];

  constructor(
    private stepsSliderService: StepsSliderService,
    private servicioTramite: TramitesApiService
  ) {
    this.InfoContext = {
      imagen: "../../../../../assets/images/CarnetConadisInformacion.png",
      info: ""
    }
    this.stepsSliderService.getPersonDt$().subscribe(data => {
      this.urlimagen = this.stepsSliderService.getImagen();
    });
  }


  ngOnInit(): void {
    this.formGroupEmit.emit(this.formData);
    this.urlimagen = this.stepsSliderService.getImagen();
    this.cargarCalidadMigratoria();
    this.cargarGrupoTipoConvenio();

    if (this.formData.controls['PoseeDiscapacidad'].value == "No") {
      this.formData.controls['Discapacidad'].disable();
      this.formData.controls['NrocarnetCONADIS'].disable();
    }

    if (this.formData.controls['select3'].value != null) {
      this.formData.controls['select1'].setValue(this.formData.controls['select1'].value);
      this.formData.controls['select2'].setValue(this.formData.controls['select2'].value);
      this.cargarGrupoTipoVisa_Convenio(this.formData.get('select2').value);

      this.cargarActividadDesarrollar(this.formData.get('select3').value);
      this.formData.controls['select3'].setValue(this.formData.controls['select3'].value);
      this.formData.controls['select4'].setValue(this.formData.controls['select4'].value);
    }
  }

  radioChange(event) {
    if (event.target.value == "No") {
      this.formData.controls['Discapacidad'].disable()
      this.formData.controls['NrocarnetCONADIS'].disable()

    } else {
      this.formData.controls['Discapacidad'].enable()
      this.formData.controls['NrocarnetCONADIS'].enable()
    }
  }

  cargarCalidadMigratoria() {
    this.servicioTramite.consultarCalidadMigratoria().subscribe(data => {
      for (let i = 0; i < data.result.length; i++) {
        const id = data.result[i].id;
        const name = data.result[i].descripcion;
        this.arrField4[0].arrOptionSelect.push({ id: id, name: name });
      }

      if (this.formData.controls['select1'].value != null) {
        this.formData.controls["select1"].setValue(this.formData.controls['select1'].value);
      }

    });

  }

  cargarGrupoTipoConvenio() {
    this.servicioTramite.consultarTipoConvenio().subscribe(data => {
      for (let i = 0; i < data.result.length; i++) {
        const id = data.result[i].id;
        const name = data.result[i].descripcion;
        this.arrField4[1].arrOptionSelect.push({ id: id, name: name });
      }
    });

  }

  cargarGrupoTipoVisa_Convenio(grupo: string) {
    this.servicioTramite.consultarTipoVisaPorConvenioCodigo(grupo).subscribe(data => {
      for (let i = 0; i < data.result.length; i++) {
        const id = data.result[i].id;
        const name = data.result[i].descripcion;
        this.arrField4[2].arrOptionSelect.push({ id: id, name: name });
      }
    });

  }

  cargarActividadDesarrollar(tipoVisacodigo: string) {
    this.servicioTramite.ConsultarActividadDesarrollarPorTipoVisaCodigo(tipoVisacodigo).subscribe(data => {
      //this.ServicioConsularFormulario.get('select1').value;
      for (let i = 0; i < data.result.length; i++) {
        const id = data.result[i].id;
        const name = data.result[i].descripcion;
        this.arrField4[3].arrOptionSelect.push({ id: id, name: name });
      }
    });

  }

  asignarValor(e: any, i: number) {
    switch (i) {
      case 2:
        let grupo = this.formData.get('select2').value;
        this.cargarGrupoTipoVisa_Convenio(grupo);

        break;
      case 3:
        let tipoVisacodigo = this.formData.get('select3').value;
        this.cargarActividadDesarrollar(tipoVisacodigo);
        break;

    }
  }

}
