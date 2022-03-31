import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ActualizarPersonaConfiguracionDto, PersonaConfiguracionDto } from '../person/models';

@Injectable({
  providedIn: 'root',
})
export class PersonaConfiguracionService {
  apiName = 'PersonRegistration';

  actualizar = (input: ActualizarPersonaConfiguracionDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/PersonRegistration/personaConfiguracion',
      body: input,
    },
    { apiName: this.apiName });

  obtener = () =>
    this.restService.request<any, PersonaConfiguracionDto>({
      method: 'GET',
      url: '/api/PersonRegistration/personaConfiguracion',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
