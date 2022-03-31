import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-datos-beneficiario-shared',
  templateUrl: './datos-beneficiario-shared.component.html',
  styleUrls: ['./datos-beneficiario-shared.component.scss']
})
export class DatosBeneficiarioSharedComponent implements OnInit {
  @Output() formGroupEmit =  new EventEmitter<any>();
  @Input() formData:FormBuilder;
  @Input() visaTitular:boolean = true;
  @Input() hasConadis:boolean = false;
  arrField1 = [
    {disabledx:false,placeHolder:"Primer Apellido",typeInput:"text",formCtrolName:"primerApellidoBeneficiario",icon:"fas fa-user-circle",contentInfo:false},
    {disabledx:false,placeHolder:"Nombres",typeInput:"text",formCtrolName:"nombreCompletoBeneficiario",icon:"fas fa-user-circle",contentInfo:false},
    {disabledx:false,placeHolder:"País de nacimiento",typeInput:"text",formCtrolName:"paisNacimientoBeneficiario",icon:"fas fa-user-circle",contentInfo:false},
    {disabledx:false,placeHolder:"Correo",typeInput:"email",formCtrolName:"emailBeneficiario",icon:"fas fa-user-circle",contentInfo:false},
];
  arrField2 = [
    {disabledx:false,placeHolder:"Nacionalidad",typeInput:"text",formCtrolName:"nacionalidadBeneficiario",icon:"fas fa-user-circle",contentInfo:false},
    {disabledx:false,placeHolder:"Nro. de documento",typeInput:"text",formCtrolName:"paisNacimientoBeneficiario",icon:"fas fa-user-circle",contentInfo:false},
];
  constructor() { 
  }

  ngOnInit(): void {
    this.formGroupEmit.emit(this.formData);
    
  }
}
