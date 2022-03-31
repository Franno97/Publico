import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-datos-domicilio-beneficiario',
  templateUrl: './datos-domicilio-beneficiario.component.html',
  styleUrls: ['./datos-domicilio-beneficiario.component.scss'],
})
export class DatosDomicilioBeneficiarioComponent implements OnInit {
  @Output() formGroupEmit = new EventEmitter<any>();
  @Input() formData: FormBuilder;
  arrField1 = [
    {
      placeHolder: 'País domicilio',
      typeInput: 'text',
      formCtrolName: 'pais',
      icon: 'fas fa-user-circle',
      contentInfo: false,
    },
    {
      placeHolder: 'Provincia domicilio',
      typeInput: 'text',
      formCtrolName: 'provinciaDomicilio',
      icon: 'fas fa-user-circle',
      contentInfo: false,
    },
    {
      placeHolder: 'Ciudad domicilio',
      typeInput: 'text',
      formCtrolName: 'ciudad',
      icon: 'fas fa-user-circle',
      contentInfo: false,
    },
    {
      placeHolder: 'Número teléfono domicilio',
      typeInput: 'text',
      formCtrolName: 'telefonoDomicilio',
      icon: 'fas fa-user-circle',
      contentInfo: false,
    },
    {
      placeHolder: 'Número teléfono celular',
      typeInput: 'text',
      formCtrolName: 'telefono',
      icon: 'fas fa-user-circle',
      contentInfo: false,
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.formGroupEmit.emit(this.formData);
  }
}
