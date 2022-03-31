import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {
  @Input() formData: FormBuilder;
  @Input() formDataSolicitante: FormBuilder;
  constructor() { }

  ngOnInit(): void {
  }
}
