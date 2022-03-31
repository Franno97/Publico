import { NgModule } from '@angular/core';
import { DynamicLayoutComponent, AuthGuard, 
  PermissionGuard  } from '@abp/ng.core';
import { Routes, RouterModule } from '@angular/router'; 
import { PersonRegistrationProcessPrecheckComponent } from './components/PersonRegistrationProcess/person-registration-process-precheck/person-registration-process-precheck.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DynamicLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PersonRegistrationProcessPrecheckComponent,
        //canActivate: [AuthGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPersonaRoutingModule {}
