import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ProfessionDto } from '../person/models';

@Injectable({
  providedIn: 'root',
})
export class ProfessionService {
  apiName = 'PersonRegistration';

  buscarPorCodigoMapeo = (searchValue: string) =>
    this.restService.request<any, ProfessionDto>({
      method: 'GET',
      url: `/api/PersonRegistration/Profession/buscarPorCodigoMapeo/${searchValue}`,
    },
    { apiName: this.apiName });

  create = (input: ProfessionDto) =>
    this.restService.request<any, ProfessionDto>({
      method: 'POST',
      url: '/api/PersonRegistration/Profession',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/PersonRegistration/Profession/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, ProfessionDto>({
      method: 'GET',
      url: `/api/PersonRegistration/Profession/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<ProfessionDto>>({
      method: 'GET',
      url: '/api/PersonRegistration/Profession',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  searchByName = (searchValue: string) =>
    this.restService.request<any, ProfessionDto>({
      method: 'GET',
      url: `/api/PersonRegistration/Profession/searchByName/${searchValue}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: ProfessionDto) =>
    this.restService.request<any, ProfessionDto>({
      method: 'PUT',
      url: `/api/PersonRegistration/Profession/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
