import type { PersonRegistrationOutput, PreCheckInput, ValidateVerificationCodeInput } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PersonDto } from '../person/models';

@Injectable({
  providedIn: 'root',
})
export class PersonRegistrationProcessService {
  apiName = 'PersonRegistration';

  getPersonDataByRegisterNumber = (registerNumber: string) =>
    this.restService.request<any, PersonDto>({
      method: 'GET',
      url: `/api/PersonRegistration/PersonRegistrationProcess/getPersonData/${registerNumber}`,
    },
    { apiName: this.apiName });

  preCheck = (input: PreCheckInput) =>
    this.restService.request<any, PersonRegistrationOutput>({
      method: 'POST',
      url: '/api/PersonRegistration/PersonRegistrationProcess/precheck',
      body: input,
    },
    { apiName: this.apiName });

  registerPerson = (registerNumber: string) =>
    this.restService.request<any, PersonDto>({
      method: 'POST',
      url: '/api/PersonRegistration/PersonRegistrationProcess/registerPerson',
      params: { registerNumber },
    },
    { apiName: this.apiName });

  sendVerificationCode = (registerNumber: string) =>
    this.restService.request<any, PersonRegistrationOutput>({
      method: 'POST',
      url: '/api/PersonRegistration/PersonRegistrationProcess/sendcode',
      params: { registerNumber },
    },
    { apiName: this.apiName });

  validateVerificationCode = (input: ValidateVerificationCodeInput) =>
    this.restService.request<any, PersonRegistrationOutput>({
      method: 'POST',
      url: '/api/PersonRegistration/PersonRegistrationProcess/validatecode',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
