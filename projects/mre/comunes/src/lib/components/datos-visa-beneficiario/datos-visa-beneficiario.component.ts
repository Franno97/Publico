import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-datos-visa-beneficiario',
  templateUrl: './datos-visa-beneficiario.component.html',
  styleUrls: ['./datos-visa-beneficiario.component.scss']
})
export class DatosVisaBeneficiarioComponent implements OnInit {
  @Output() formGroupEmit = new EventEmitter<any>();
  @Input() formData: FormGroup;
  @Input() showAlertDatosVisa: boolean = false;

  tieneVisaCiudadano = false;

  arrField5 = [
    { placeHolder: "Fecha expiración", typeInput: "text", formCtrolName: "fechaExpiracionVisa", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Fecha de emisión", typeInput: "text", formCtrolName: "fechaEmisionVisa", icon: "fas fa-user-circle", contentInfo: false },
  ];
  arrField6 = [
    { placeHolder: "Número de visa", typeInput: "text", formCtrolName: "numberVisa", icon: "fas fa-user-circle", contentInfo: false },
    { placeHolder: "Tipo de visa", typeInput: "text", formCtrolName: "tipoVisa", icon: "fas fa-user-circle", contentInfo: false },

  ];

  constructor() { }

  ngOnInit(): void {

    if (this.formData.get('visaControl').value == "Si") {
      this.showAlertDatosVisa = false;
      this.tieneVisaCiudadano = true;
    } else {
      this.showAlertDatosVisa = true;
      this.tieneVisaCiudadano = false;
    }
    this.formGroupEmit.emit(this.formData);

  }
  handleChange(event) {
    if (event.target.value == "Si") {
      this.showAlertDatosVisa = false;
    }
    else {
      this.showAlertDatosVisa = true;
    }

  }

}
