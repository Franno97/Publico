import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './input-field.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ContentInfoComponent } from './content-info/content-info.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    InputFieldComponent,
    ContentInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbPopoverModule
    

  ],
  exports:[InputFieldComponent]
})
export class InputFieldModule {
  
 }
