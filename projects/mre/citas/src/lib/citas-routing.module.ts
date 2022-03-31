import { AuthGuard, DynamicLayoutComponent, PermissionGuard } from "@abp/ng.core";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CitaComponent } from "./componentes/cita/cita.component";
import { GenerarCitaComponent } from "./componentes/generar-cita/generar-cita.component";
import { ReagendarCitaComponent } from "./componentes/reagendar-cita/reagendar-cita.component";

const routes: Routes = [
    {
        path: '',
        // pathMatch: 'full',
        component: DynamicLayoutComponent,

        children: [
            {
                path: '',
                component: CitaComponent,
                canActivate: [AuthGuard, PermissionGuard]
            },
            {
                path: 'adicionar',
                component: GenerarCitaComponent,
                canActivate: [AuthGuard, PermissionGuard]
            },
            {
                path: 'reagendar/:id',
                component: ReagendarCitaComponent,
                canActivate: [AuthGuard, PermissionGuard]
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CitasRoutingModule { }