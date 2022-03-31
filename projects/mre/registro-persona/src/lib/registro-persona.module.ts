import { NgModule, NgModuleFactory, ModuleWithProviders } from '@angular/core';
import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { NgbDateParserFormatter, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { RegistroPersonaRoutingModule } from './registro-persona-routing.module';
import { PersonRegistrationProcessPrecheckComponent } from './components/PersonRegistrationProcess/person-registration-process-precheck/person-registration-process-precheck.component';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { NgbDateCustomParserFormatter } from './compartido/ngb-date-custom-parser-formatter';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    PersonRegistrationProcessPrecheckComponent
  ],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbDatepickerModule,
    NgbModule,
    RegistroPersonaRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: (environment.captchaSiteKey)  || null,
      } as RecaptchaSettings,
    },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
  exports: [],
})
export class RegistroPersonaModule {
  static forChild(): ModuleWithProviders<RegistroPersonaModule> {
    return {
      ngModule: RegistroPersonaModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<RegistroPersonaModule> {
    return new LazyModuleFactory(RegistroPersonaModule.forChild());
  }
}
