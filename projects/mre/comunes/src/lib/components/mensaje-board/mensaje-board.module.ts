import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeBoardComponent } from './mensaje-board.component';



@NgModule({
  declarations: [
    MensajeBoardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[MensajeBoardComponent]
})
export class MensajeBoardModule { }
