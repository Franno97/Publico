import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultasComponent } from './multas.component';
import { TableViewModule } from '../table-view/table-view.module';



@NgModule({
  declarations: [
    MultasComponent
  ],
  imports: [
    CommonModule,
    TableViewModule
  ],
  exports:[MultasComponent]
})
export class MultasModule { }
