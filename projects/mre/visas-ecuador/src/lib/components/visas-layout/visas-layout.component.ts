import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'lib-visas-layout',
  templateUrl: './visas-layout.component.html',
  styleUrls: ['./visas-layout.component.scss']
})
export class VisasLayoutComponent implements OnInit {
  @Input() dataVisas: any = {};
  formTitle: string = 'Solicitud de visa de residencia temporal de excepción por autoridad de movilidad humana (VIRTE)';
  valueClickStepper: Array<number> = [0];

  constructor() { }

  ngOnInit(): void {

  }

  clickLink(data: any) {
    this.valueClickStepper.pop();
    this.valueClickStepper.push(data);
  }

}
