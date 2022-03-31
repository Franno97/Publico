import { EnvironmentService } from "@abp/ng.core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SharepointMensajesApiService {
    apiUrl = '';

    constructor(
        private http: HttpClient,
        private servicioEnvironment: EnvironmentService
    ) {
        this.apiUrl = this.servicioEnvironment.getApiUrl('SharePointMensaje');
    }

    obtenerMensajesInformativos(modulo: string, pagina: string): Observable<any> {
        const _headers: HttpHeaders = new HttpHeaders()
            .append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        const url = this.apiUrl + '/api/Mensaje?modulo=' + modulo + "&pagina=" + pagina;
        return this.http.get<any>(url, { headers: _headers });
    }

    obtenerTiposDocumentosPorTipo(tipoDocumento: string): Observable<any> {
        const url = this.apiUrl + '/api/tipoDocumental?titulo=' + tipoDocumento;
        return this.http.get<any>(url);
    }
}