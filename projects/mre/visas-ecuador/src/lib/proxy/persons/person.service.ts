import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdatePersonDto, GetPersonInputDto, PersonDto } from '../person/models';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  apiName = 'PersonRegistration';

  create = (input: CreateUpdatePersonDto) =>
    this.restService.request<any, PersonDto>({
      method: 'POST',
      url: '/api/PersonRegistration/persons',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/PersonRegistration/persons/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, PersonDto>({
      method: 'GET',
      url: `/api/PersonRegistration/persons/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetPersonInputDto) =>
    this.restService.request<any, PagedResultDto<PersonDto>>({
      method: 'GET',
      url: '/api/PersonRegistration/persons',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  obtenerPersonaPorNombreUsuario = (nombreUsuario: string) =>
    this.restService.request<any, PersonDto>({
      method: 'GET',
      url: `/api/PersonRegistration/persons/usuario/${nombreUsuario}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdatePersonDto) =>
    this.restService.request<any, PersonDto>({
      method: 'PUT',
      url: `/api/PersonRegistration/persons/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
