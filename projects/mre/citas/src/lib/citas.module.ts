import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { GenerarCitaComponent } from './componentes/generar-cita/generar-cita.component';
import { CitaComponent } from './componentes/cita/cita.component';
import { ReagendarCitaComponent } from './componentes/reagendar-cita/reagendar-cita.component';



@NgModule({
  declarations: [
    CitasComponent,
    GenerarCitaComponent,
    CitaComponent,
    ReagendarCitaComponent
  ],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbModule,
    NgbDatepickerModule,
    CitasRoutingModule
  ],
  exports: [
    CitasComponent
  ]
})

export class CitasModule {
  static forChild(): ModuleWithProviders<CitasModule> {
    return {
      ngModule: CitasModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<CitasModule> {
    return new LazyModuleFactory(CitasModule.forChild());
  }
}