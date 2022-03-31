import { NgModule } from '@angular/core';
import { SolicitudServicioConsularComponent } from './solicitud-servicio-consular.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';
import { CommonModule } from '@angular/common';
import { FormTemplateModule } from '@mre/comunes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CiudadanoModule } from 'projects/mre/ciudadano/src/public-api';
import { VisasEcuadorModule } from '@mre/visas-ecuador';



@NgModule({
  declarations: [
    SolicitudServicioConsularComponent,
    FormLayoutComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CiudadanoModule,
    FormTemplateModule,
    ReactiveFormsModule,
    VisasEcuadorModule,
    
  ],
  exports: [
    SolicitudServicioConsularComponent
  ]
})
export class SolicitudServicioConsularModule { }
