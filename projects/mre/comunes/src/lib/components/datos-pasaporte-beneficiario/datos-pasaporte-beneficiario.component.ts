import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-datos-pasaporte-beneficiario',
  templateUrl: './datos-pasaporte-beneficiario.component.html',
  styleUrls: ['./datos-pasaporte-beneficiario.component.scss']
})
export class DatosPasaporteBeneficiarioComponent implements OnInit {
  @Output() formGroupEmit =  new EventEmitter<any>();
  @Input() formData:FormBuilder;
    arrField3 = [
      {placeHolder:"Número",typeInput:"text",formCtrolName:"numeroPasaporte",icon:"fas fa-user-circle",contentInfo:false},
      // {placeHolder:"Tipo Documento",typeInput:"text",formCtrolName:"tipoDocumento",icon:"fas fa-user-circle",contentInfo:false},
    {placeHolder:"Fecha de emisión",typeInput:"text",formCtrolName:"fechaEmisionPasaporte",icon:"fas fa-user-circle",contentInfo:false},
    {placeHolder:"País de emisión",typeInput:"text",formCtrolName:"paisEmisionPasaporte",icon:"fas fa-user-circle",contentInfo:false},
    {placeHolder:"Nombre completo",typeInput:"text",formCtrolName:"nombreCompleto",icon:"fas fa-user-circle",contentInfo:false}
];
arrField4 = [
 
  {placeHolder:"Fecha Expiracion",typeInput:"text",formCtrolName:"fechaExpiracionPasaporte",icon:"fas fa-user-circle",contentInfo:false},
  {placeHolder:"Ciudad emisión",typeInput:"text",formCtrolName:"ciudadEmisionPasaporte",icon:"fas fa-user-circle",contentInfo:false},
  {placeHolder:"Fecha de nacimiento",typeInput:"text",formCtrolName:"fechaNacimiento",icon:"fas fa-user-circle",contentInfo:false},
];
  constructor() {

     }

  ngOnInit(): void {
    this.formGroupEmit.emit(this.formData);
    
  }
}
