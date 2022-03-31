import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-domicilio-pasaporte-visa',
  templateUrl: './domicilio-pasaporte-visa.component.html',
  styleUrls: ['./domicilio-pasaporte-visa.component.scss']
})
export class DomicilioPasaporteVisaComponent implements OnInit {
  @Input() formData: FormBuilder;
  @Input() showAlertDatosVisa:boolean = false;
  constructor() { }
  ngOnInit(): void {
  }
}
