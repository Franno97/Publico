import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-mensaje-board',
  templateUrl: './mensaje-board.component.html',
  styleUrls: ['./mensaje-board.component.scss']
})
export class MensajeBoardComponent implements OnInit {
  @Input() mensajesArr:Array<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
