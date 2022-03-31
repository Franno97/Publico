import { ModuleWithProviders, NgModule } from '@angular/core';
import { PUBLIC_ROUTE_PROVIDERS } from './providers/route.provider';

@NgModule()
export class RegistroPersonaConfigModule {
  static forRoot(): ModuleWithProviders<RegistroPersonaConfigModule> {
    return {
      ngModule: RegistroPersonaConfigModule,
      providers: [PUBLIC_ROUTE_PROVIDERS],
    };
  }
}
