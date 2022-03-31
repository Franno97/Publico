import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';
import { eThemeSharedRouteNames } from '@abp/ng.theme.shared';



export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {

    //Ocultar menu administracion
    routesService.patch(eThemeSharedRouteNames.Administration, { invisible: true });

    //Agregar menus
    routesService.add([
      {
        path: '/',
        name: '::Menu:Inicio',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/contactenos',
        name: '::Menu:Contactenos',
        iconClass: 'fa fa-mobile',
        order: 3,
        layout: eLayoutType.application,
      },
      {
        path: '/preguntas-frecuentes',
        name: '::Menu:PreguntasFrecuentes',
        iconClass: 'fa fa-question-circle-o',
        order: 4,
        layout: eLayoutType.application,
      },
      {
        path: '/servicios',
        name: '::Menu:Servicios',
        iconClass: 'fa fa-clone',
        order: 5,
        layout: eLayoutType.application,
      },
      {
        path: '/citas',
        name: '::Menu:Cita',
        iconClass: 'fas fa-book',
        order: 6,
        layout: eLayoutType.application,
      },

    ]);

  };
}
