import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-tabs-view',
  templateUrl: './tabs-view.component.html',
  styleUrls: ['./tabs-view.component.scss'],
})
export class TabsViewComponent implements OnInit {
  @Input() tabsHeader: Array<string>;
  @Output() tabsVisited = new EventEmitter();
  active: number = 1;
  linkVisited = [true, false, false, false];

  constructor() {
  }
  private comprobarLinkVistados(): boolean {
    return this.linkVisited[0] && this.linkVisited[1] && this.linkVisited[2] && this.linkVisited[3];
  }

  ngOnInit(): void { }

  visited(i: number) {
    this.linkVisited[i] = true;

    this.tabsVisited.emit(this.comprobarLinkVistados());
  }

}
