import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-form-requisitios',
  templateUrl: './form-requisitios.component.html',
  styleUrls: ['./form-requisitios.component.scss']
})
export class FormRequisitiosComponent implements OnInit {
  @Input() tabHeader: Array<any> = [];
  @Input() tabDataSource: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
  }
  rowClickedEvent(data: any) { }
}
