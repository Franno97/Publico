import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { VisaTypeDto } from '../person/models';

@Injectable({
  providedIn: 'root',
})
export class VisaTypeService {
  apiName = 'PersonRegistration';

  buscarPorCodigoMapeo = (searchValue: string) =>
    this.restService.request<any, VisaTypeDto>({
      method: 'GET',
      url: `/api/PersonRegistration/VisaType/buscarPorCodigoMapeo/${searchValue}`,
    },
    { apiName: this.apiName });

  create = (input: VisaTypeDto) =>
    this.restService.request<any, VisaTypeDto>({
      method: 'POST',
      url: '/api/PersonRegistration/VisaType',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/PersonRegistration/VisaType/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, VisaTypeDto>({
      method: 'GET',
      url: `/api/PersonRegistration/VisaType/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<VisaTypeDto>>({
      method: 'GET',
      url: '/api/PersonRegistration/VisaType',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  searchByName = (searchValue: string) =>
    this.restService.request<any, VisaTypeDto>({
      method: 'GET',
      url: `/api/PersonRegistration/VisaType/searchByName/${searchValue}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: VisaTypeDto) =>
    this.restService.request<any, VisaTypeDto>({
      method: 'PUT',
      url: `/api/PersonRegistration/VisaType/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
