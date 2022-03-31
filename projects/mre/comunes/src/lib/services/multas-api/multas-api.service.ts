import { EnvironmentService } from "@abp/ng.core";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MultasApiService {
    apiUrl = '';


    constructor(
        private http: HttpClient,
        private servicioEnvironment: EnvironmentService
    ) {
        this.apiUrl = this.servicioEnvironment.getApiUrl('Multa');
    }

    consultarMultasPorTramiteId(tramiteId: string): Observable<any> {
        const url = this.apiUrl + "/api/Multa/ConsultarMultasPorTramiteId";
        return this.http.post(url, { tramiteId: tramiteId });
    }

}