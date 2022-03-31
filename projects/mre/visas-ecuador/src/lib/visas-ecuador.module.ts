import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatosPersonalesModule, DomicilioPasaporteVisaModule, FormTemplateModule, InputFieldModule} from '@mre/comunes';
import { SliderComponent } from './components/slider/slider.component';
import { SubirArchivoComponent } from './components/subir-archivo/subir-archivo.component';
import { VisasLayoutComponent } from './components/visas-layout/visas-layout.component';
import { EnterMDGComponent } from './components/visas/enter-mdg/enter-mdg.component';
import { FomularioDeSolicitudComponent } from './components/visas/formulario-de-solicitud/fomulario-de-solicitud.component';
import { TipoDeVisaComponent } from './components/visas/tipo-de-visa/tipo-de-visa.component';
import { VisasComponent } from './components/visas/visas.component';
import { VisasEcuadorComponent } from './visas-ecuador.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [
    VisasEcuadorComponent,
    SliderComponent,
    VisasLayoutComponent,
    VisasComponent,
    TipoDeVisaComponent,
    EnterMDGComponent,
    FomularioDeSolicitudComponent,
    SubirArchivoComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormTemplateModule,
    InputFieldModule,
    DomicilioPasaporteVisaModule,
    DatosPersonalesModule,
    MatStepperModule,
    MatExpansionModule,
    MatButtonModule,
    NgbModule,
    NgxExtendedPdfViewerModule
  ],
  exports: [
    VisasEcuadorComponent
  ]
})
export class VisasEcuadorModule { }
