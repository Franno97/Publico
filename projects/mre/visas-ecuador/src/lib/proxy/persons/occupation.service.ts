import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { OccupationDto } from '../person/models';

@Injectable({
  providedIn: 'root',
})
export class OccupationService {
  apiName = 'PersonRegistration';

  buscarPorCodigoMapeo = (searchValue: string) =>
    this.restService.request<any, OccupationDto>({
      method: 'GET',
      url: `/api/PersonRegistration/Occupation/buscarPorCodigoMapeo/${searchValue}`,
    },
    { apiName: this.apiName });

  create = (input: OccupationDto) =>
    this.restService.request<any, OccupationDto>({
      method: 'POST',
      url: '/api/PersonRegistration/Occupation',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/PersonRegistration/Occupation/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, OccupationDto>({
      method: 'GET',
      url: `/api/PersonRegistration/Occupation/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<OccupationDto>>({
      method: 'GET',
      url: '/api/PersonRegistration/Occupation',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  searchByName = (searchValue: string) =>
    this.restService.request<any, OccupationDto>({
      method: 'GET',
      url: `/api/PersonRegistration/Occupation/searchByName/${searchValue}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: OccupationDto) =>
    this.restService.request<any, OccupationDto>({
      method: 'PUT',
      url: `/api/PersonRegistration/Occupation/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
