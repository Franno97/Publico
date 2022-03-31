import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRequisitiosComponent } from './form-requisitios.component';
import { TableViewModule } from '../table-view/table-view.module';



@NgModule({
  declarations: [
    FormRequisitiosComponent
  ],
  imports: [
    CommonModule,
    TableViewModule
  ],
  exports:[FormRequisitiosComponent]
})
export class FormRequisitiosModule { }
