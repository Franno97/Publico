import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IdentityDocumentDto } from '../person/models';

@Injectable({
  providedIn: 'root',
})
export class IdentityDocumentService {
  apiName = 'PersonRegistration';

  create = (input: IdentityDocumentDto) =>
    this.restService.request<any, IdentityDocumentDto>({
      method: 'POST',
      url: '/api/PersonRegistration/IdentityDocument',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/PersonRegistration/IdentityDocument/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, IdentityDocumentDto>({
      method: 'GET',
      url: `/api/PersonRegistration/IdentityDocument/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<IdentityDocumentDto>>({
      method: 'GET',
      url: '/api/PersonRegistration/IdentityDocument',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: IdentityDocumentDto) =>
    this.restService.request<any, IdentityDocumentDto>({
      method: 'PUT',
      url: `/api/PersonRegistration/IdentityDocument/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
