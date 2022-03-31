import { Component, Input, OnInit } from '@angular/core';
import { InfoContext } from 'projects/mre/visas-ecuador/src/lib/modelos/models';

@Component({
  selector: 'lib-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Input() placeHolder:string = '';
  @Input()  formCtrlName:string = "";
  @Input() typeInput:string = '';
  @Input() formControlData:any;
  @Input() icon:string ='';
  @Input() contentInfo:boolean = false;
  @Input() InfoContext:InfoContext={imagen:"",info:""};
  
  validField:boolean=false; 
  constructor() { }

  ngOnInit(): void {
  }
  changeColorToInput()
  {
      this.validField =  this.formControlData.controls[this.formCtrlName].valid;
  }
}
