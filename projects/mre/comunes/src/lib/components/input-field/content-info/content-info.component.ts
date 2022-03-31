import { Component, Input, OnInit } from '@angular/core';
import { InfoContext } from 'projects/mre/visas-ecuador/src/lib/modelos/models';

@Component({
  selector: 'lib-content-info',
  templateUrl: './content-info.component.html',
  styleUrls: ['./content-info.component.scss']
})
export class ContentInfoComponent implements OnInit {
@Input() InfoContext:InfoContext={imagen:"",info:""};
  constructor() { }

  ngOnInit(): void {
    
  }

}
