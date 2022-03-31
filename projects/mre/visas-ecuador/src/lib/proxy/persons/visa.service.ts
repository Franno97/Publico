import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { VisaDto } from '../person/models';

@Injectable({
  providedIn: 'root',
})
export class VisaService {
  apiName = 'PersonRegistration';

  create = (input: VisaDto) =>
    this.restService.request<any, VisaDto>({
      method: 'POST',
      url: '/api/PersonRegistration/visas',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/PersonRegistration/visas/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, VisaDto>({
      method: 'GET',
      url: `/api/PersonRegistration/visas/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<VisaDto>>({
      method: 'GET',
      url: '/api/PersonRegistration/visas',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: VisaDto) =>
    this.restService.request<any, VisaDto>({
      method: 'PUT',
      url: `/api/PersonRegistration/visas/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
