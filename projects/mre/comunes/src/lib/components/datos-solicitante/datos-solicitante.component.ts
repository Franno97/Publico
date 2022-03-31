import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'lib-datos-solicitante',
  templateUrl: './datos-solicitante.component.html',
  styleUrls: ['./datos-solicitante.component.scss']
})
export class DatosSolicitanteComponent implements OnInit {
  @Output() formGroupEmit =  new EventEmitter<any>();
  @Output() stepperEmit =  new EventEmitter<any>();
  @Input() formData:FormBuilder;
  arrField1 = [
       {placeHolder:"Cédula",typeInput:"text",formCtrolName:"cedula",icon:"fas fa-user-circle",contentInfo:false},
       {placeHolder:"Nacionalidad",typeInput:"text",formCtrolName:"nacionalidad",icon:"fas fa-user-circle",contentInfo:false},
       {placeHolder:"Nombre y Apellidos",typeInput:"text",formCtrolName:"nombreyapellido",icon:"fas fa-user-circle",contentInfo:false},
       {placeHolder:"País",typeInput:"text",formCtrolName:"pais",icon:"fas fa-user-circle",contentInfo:false},
       {placeHolder:"Ciudad",typeInput:"text",formCtrolName:"ciudad",icon:"fas fa-user-circle",contentInfo:false},
       {placeHolder:"País del Consulado / Unidad Administrativa",typeInput:"text",formCtrolName:"PaisConsulado",icon:"fas fa-user-circle",contentInfo:false},
  ];
  arrField2 = [
       {placeHolder:"Teléfono",typeInput:"text",formCtrolName:"telefono",icon:"fas fa-user-circle",contentInfo:false},
       {placeHolder:"Edad",typeInput:"text",formCtrolName:"edad",icon:"fas fa-user-circle",contentInfo:false},
       {placeHolder:"Nombre del Consulado / Unidad Administrativa",typeInput:"text",formCtrolName:"NombreConsulado",icon:"fas fa-user-circle",contentInfo:false}
  ];

  constructor() { }

  ngOnInit(): void {
    this.formGroupEmit.emit(this.formData);
  }
}
