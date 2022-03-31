import { EnvironmentService } from '@abp/ng.core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequisitosApiService {
  apiUrl = '';

  constructor(
    private http: HttpClient,
    private servicioEnvironment: EnvironmentService
  ) {
    this.apiUrl = this.servicioEnvironment.getApiUrl('Requisito');
    this.apiUrl = this.apiUrl + '/api/Requisito/'
  }

  grabarDocumentoZip(solicitud: FormData): Observable<any> {
    const url = this.apiUrl + 'GrabarDocumentoZipAsync';
    return this.http.post(url, solicitud);
  }

}
