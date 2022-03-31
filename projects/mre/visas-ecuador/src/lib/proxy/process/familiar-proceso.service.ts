import type { PersonRegistrationOutput, PreCheckInput, ValidateVerificationCodeInput } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PersonDto } from '../person/models';

@Injectable({
  providedIn: 'root',
})
export class FamiliarProcesoService {
  apiName = 'PersonRegistration';

  enviarCodigoVerificacion = (numeroRegistro: string) =>
    this.restService.request<any, PersonRegistrationOutput>({
      method: 'POST',
      url: '/api/PersonRegistration/FamiliarProceso/enviarcodigo',
      params: { numeroRegistro },
    },
    { apiName: this.apiName });

  guardarPersona = (numeroRegistro: string) =>
    this.restService.request<any, PersonDto>({
      method: 'POST',
      url: '/api/PersonRegistration/FamiliarProceso/guardarpersona',
      params: { numeroRegistro },
    },
    { apiName: this.apiName });

  obtenerInformacionPersonaByNumeroRegistro = (numeroRegistro: string) =>
    this.restService.request<any, PersonDto>({
      method: 'GET',
      url: `/api/PersonRegistration/FamiliarProceso/obtenerinformacionpersona/${numeroRegistro}`,
    },
    { apiName: this.apiName });

  validarCodigoVerificacion = (input: ValidateVerificationCodeInput) =>
    this.restService.request<any, PersonRegistrationOutput>({
      method: 'POST',
      url: '/api/PersonRegistration/FamiliarProceso/validarcodigo',
      body: input,
    },
    { apiName: this.apiName });

  verificacionPrevia = (input: PreCheckInput) =>
    this.restService.request<any, PersonRegistrationOutput>({
      method: 'POST',
      url: '/api/PersonRegistration/FamiliarProceso/verificacionprevia',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
