import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-ciudadano',
  template: `
  <lib-tramites-pendientes></lib-tramites-pendientes>
  `,
  styles: [
  ]
})
export class CiudadanoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
