import { Component,OnInit } from '@angular/core';


import { ReplaceableComponentsService,ConfigStateService,
  CurrentUserDto,
  RoutesService } from '@abp/ng.core'; 

import { eThemeBasicComponents } from '@abp/ng.theme.basic';


import { Observable } from 'rxjs';
import { LogoComponent } from './components/logo/logo.component';
import { eRegistroPersonaRouteNames } from '@mre/registro-persona/config';
import { CuerpoComponent } from './components/cuerpo/cuerpo.component';



@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent implements OnInit {
  
  usuarioActual$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');
 

  constructor(private configState: ConfigStateService,
      private replaceableComponents: ReplaceableComponentsService,
      private routesService: RoutesService) {} // injected ReplaceableComponentsService

  ngOnInit() {  
       

      //Establecer los menus que requieren que el usuario se encuentre
      //autentificado
      this.usuarioActual$.subscribe(usuario => {

        
        if (!usuario.isAuthenticated) {

          //Menus que se deben quitar si el usuario no esta  autentificado
          this.routesService.remove(["::Menu:Servicios"]);
          this.routesService.remove(["::Menu:Cita"]);
          this.routesService.refresh();
        
        }else{
          //Menus que se deben quitar si el usuario es autentificado
          this.routesService.remove([eRegistroPersonaRouteNames.RegistroPersona]);

          this.routesService.refresh();
        }
      });

      //Establecer personalizaciones UI.
      //Layout 
      this.replaceableComponents.add({
        component: CuerpoComponent,
        key: eThemeBasicComponents.ApplicationLayout,
      });

      //Logo
      this.replaceableComponents.add({
        component: LogoComponent,
        key: eThemeBasicComponents.Logo,
      });
  }
}
