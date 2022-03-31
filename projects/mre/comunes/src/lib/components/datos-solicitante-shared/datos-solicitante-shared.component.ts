import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-datos-solicitante-shared',
  templateUrl: './datos-solicitante-shared.component.html',
  styleUrls: ['./datos-solicitante-shared.component.scss']
})
export class DatosSolicitanteSharedComponent implements OnInit {
  @Output() formGroupEmit = new EventEmitter<any>();
  @Output() stepperEmit = new EventEmitter<any>();
  @Input() formData: FormGroup;
  @Input() ctrlAdminShow: boolean = false;

  mostrarDatosSolicitante = false;

  arrField1 = [
    { disabledx: false, placeHolder: "Cédula", typeInput: "text", formCtrolName: "cedulaSolicitante", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "Nacionalidad", typeInput: "text", formCtrolName: "nacionalidadSolicitante", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "Nombre y Apellidos", typeInput: "text", formCtrolName: "nombreCompletSolicitanteo", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "País", typeInput: "text", formCtrolName: "paisSolicitante", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "Ciudad", typeInput: "text", formCtrolName: "ciudadSolicitante", icon: "fas fa-user-circle", contentInfo: false },
  ];
  arrField2 = [
    { disabledx: false, placeHolder: "Teléfono", typeInput: "text", formCtrolName: "telefonoSolicitante", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "Edad", typeInput: "text", formCtrolName: "edadSolicitante", icon: "fas fa-user-circle", contentInfo: false },
    { disabledx: false, placeHolder: "Correo electrónico", typeInput: "email", formCtrolName: "correoSolicitante", icon: "fas fa-user-circle", contentInfo: false }
  ];
  constructor() {

  }

  ngOnInit(): void {
    this.formGroupEmit.emit(this.formData);
  }

  toggleDatosSolicitante(): void {
    this.mostrarDatosSolicitante = !this.mostrarDatosSolicitante;
  }


}
