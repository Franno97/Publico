import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IdentityDocumentTypeDto } from '../person/models';

@Injectable({
  providedIn: 'root',
})
export class IdentityDocumentTypeService {
  apiName = 'PersonRegistration';

  buscarPorCodigoMapeo = (searchValue: string) =>
    this.restService.request<any, IdentityDocumentTypeDto>({
      method: 'GET',
      url: `/api/PersonRegistration/IdentityDocumentTypeDto/buscarPorCodigoMapeo/${searchValue}`,
    },
    { apiName: this.apiName });

  create = (input: IdentityDocumentTypeDto) =>
    this.restService.request<any, IdentityDocumentTypeDto>({
      method: 'POST',
      url: '/api/PersonRegistration/IdentityDocumentTypeDto',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/PersonRegistration/IdentityDocumentTypeDto/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, IdentityDocumentTypeDto>({
      method: 'GET',
      url: `/api/PersonRegistration/IdentityDocumentTypeDto/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<IdentityDocumentTypeDto>>({
      method: 'GET',
      url: '/api/PersonRegistration/IdentityDocumentTypeDto',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<IdentityDocumentTypeDto>>({
      method: 'GET',
      url: '/api/PersonRegistration/IdentityDocumentTypeDto/lookup',
    },
    { apiName: this.apiName });

  searchByName = (searchValue: string) =>
    this.restService.request<any, IdentityDocumentTypeDto>({
      method: 'GET',
      url: `/api/PersonRegistration/IdentityDocumentTypeDto/searchByName/${searchValue}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: IdentityDocumentTypeDto) =>
    this.restService.request<any, IdentityDocumentTypeDto>({
      method: 'PUT',
      url: `/api/PersonRegistration/IdentityDocumentTypeDto/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
