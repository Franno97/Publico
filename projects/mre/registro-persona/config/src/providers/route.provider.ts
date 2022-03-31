import { eLayoutType, RoutesService,AbstractNavTreeService,ABP  } from '@abp/ng.core';
import { Injectable,APP_INITIALIZER } from '@angular/core';
import { eRegistroPersonaRouteNames } from '../enums/route-names';

 

export const PUBLIC_ROUTE_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: configureRoutes,
    deps: [RoutesService],
    multi: true,
  },
];

export function configureRoutes(routesService: RoutesService ) {
  return () => {

     
    routesService.add([
      {
        path: '/registro-persona',
        name: eRegistroPersonaRouteNames.RegistroPersona,
        iconClass: 'fa fa-user-plus',
        layout: eLayoutType.application,
        order: 2,
        //requiredPolicy: 'NOMBRE-PERMISO', 
      },
    ]);
  
  };
}

