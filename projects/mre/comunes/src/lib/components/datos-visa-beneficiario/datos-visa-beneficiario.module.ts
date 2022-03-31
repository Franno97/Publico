import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosVisaBeneficiarioComponent } from './datos-visa-beneficiario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from '@mre/comunes';



@NgModule({
  declarations: [
    DatosVisaBeneficiarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldModule,
    FormsModule
  ],
  exports:[DatosVisaBeneficiarioComponent]
})
export class DatosVisaBeneficiarioModule { }
