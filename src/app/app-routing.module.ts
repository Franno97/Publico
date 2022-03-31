import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { ServiciosComponent } from './components/servicios/servicios.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'contactenos',
    component: ContactenosComponent,
  },
  {
    path: 'preguntas-frecuentes',
    component: PreguntasFrecuentesComponent,
  },
  {
    path: 'servicios',
    component: ServiciosComponent,
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'registro-persona',
    loadChildren: () =>
      import('@mre/registro-persona').then(m => m.RegistroPersonaModule.forLazy()),
  },
  {
    path: 'citas',
    loadChildren: () =>
      import('@mre/citas').then(m => m.CitasModule.forLazy()),
    canActivate: [AuthGuard, PermissionGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
