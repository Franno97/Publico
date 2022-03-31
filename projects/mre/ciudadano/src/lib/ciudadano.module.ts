import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatosBeneficiarioSharedModule, DatosPersonalesModule, DatosSolicitanteSharedModule, DomicilioPasaporteVisaModule, FormTemplateModule, MultasModule, SubirArchivoModule, TableViewModule } from '@mre/comunes';
import { CiudadanoComponent } from './ciudadano.component';
import { TramitesPendientesComponent } from './components/tramites-pendientes/tramites-pendientes.component';
import { ReconocimientoFacialCiudadanoComponent } from './components/reconocimiento-facial-ciudadano/reconocimiento-facial-ciudadano.component';
import { RealizarPagoCiudadanoComponent } from './components/realizar-pago-ciudadano/realizar-pago-ciudadano.component';
import { RegistroPagoCiudadanoComponent } from './components/registro-pago-ciudadano/registro-pago-ciudadano.component';
import { SubsanarPagoCiudadanoComponent } from './components/subsanar-pago-ciudadano/subsanar-pago-ciudadano.component';
import { SubsanacionInformacionCiudadanoComponent } from './components/subsanacion-informacion-ciudadano/subsanacion-informacion-ciudadano.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReconocimientoFacialFacetecComponent } from './components/reconocimiento-facial-facetec/reconocimiento-facial-facetec.component';
import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { VisualizarImagenModule } from 'projects/mre/comunes/src/lib/components/visualizar-imagen/visualizar-imagen.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    CiudadanoComponent,
    TramitesPendientesComponent,
    ReconocimientoFacialCiudadanoComponent,
    RealizarPagoCiudadanoComponent,
    RegistroPagoCiudadanoComponent,
    SubsanarPagoCiudadanoComponent,
    SubsanacionInformacionCiudadanoComponent,
    ReconocimientoFacialFacetecComponent
  ],
  imports: [
    CommonModule,
    FormTemplateModule,
    MatStepperModule,
    TableViewModule,
    DatosBeneficiarioSharedModule,
    DatosSolicitanteSharedModule,
    DatosPersonalesModule,
    DomicilioPasaporteVisaModule,
    SubirArchivoModule,
    ReactiveFormsModule,
    MultasModule,
    FormsModule,
    CoreModule,
    ThemeSharedModule,
    VisualizarImagenModule,
    NgbDropdownModule
  ],
  exports: [
    CiudadanoComponent,
  ]
})
export class CiudadanoModule { }
