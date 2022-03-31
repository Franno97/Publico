import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale'; 

import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';

import {NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


import { RegistroPersonaConfigModule } from '@mre/registro-persona/config';

import { ComunesModule } from '@mre/comunes';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { LogoComponent } from './components/logo/logo.component';
import { CuerpoComponent } from './components/cuerpo/cuerpo.component';
import { VisasEcuadorModule } from '@mre/visas-ecuador';
import { SolicitudServicioConsularModule } from '@mre/solicitud-servicio-consular';
import { ServiciosComponent } from './components/servicios/servicios.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    ThemeSharedModule.forRoot(),
    NgbNavModule,
    AccountConfigModule.forRoot(),  
    RegistroPersonaConfigModule.forRoot(),
    NgxsModule.forRoot(),
    ThemeBasicModule.forRoot(),
    ComunesModule,
    SolicitudServicioConsularModule,
    VisasEcuadorModule
  ],
  declarations: [AppComponent, PreguntasFrecuentesComponent,ServiciosComponent, ContactenosComponent, LogoComponent, CuerpoComponent],
  providers: [APP_ROUTE_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
