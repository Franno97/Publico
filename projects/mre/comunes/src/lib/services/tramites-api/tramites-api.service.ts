import { EnvironmentService } from "@abp/ng.core";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { formularioVisasFull } from "projects/mre/visas-ecuador/src/lib/modelos/models";
import { Observable } from "rxjs";
import {
    SoclicitudCrearMovimientoServicio,
    SolicitudCrearDocumentoServicio
} from "../../models/tramites-api-servicio-modelos";

@Injectable({
    providedIn: 'root'
})
export class TramitesApiService {
    apiUrl = '';

    constructor(
        private http: HttpClient,
        private servicioEnvironment: EnvironmentService
    ) {
        this.apiUrl = this.servicioEnvironment.getApiUrl('Tramite');
    }

    // Guardar el trámite
    crearTramite(solicitud: formularioVisasFull): Observable<any> {
        const url = this.apiUrl + '/api/Tramite/CrearTramite';
        return this.http.post(url, solicitud)
    }

    // Consultar el trámite por el ciudadano
    consultarTramitesPorCiudadanoId(id: number): Observable<any> {
        const url = this.apiUrl + '/api/Tramite/ConsultarTramitesPorCiudadanoId';
        return this.http.post(url, { usuarioId: id });
    }

    // Crear el movimiento
    crearMovimiento(solicitud: SoclicitudCrearMovimientoServicio): Observable<any> {
        const url = this.apiUrl + '/api/Movimiento/CrearMovimiento';
        return this.http.post(url, solicitud);
    }

    crearDocumento(solicitud: SolicitudCrearDocumentoServicio): Observable<any> {
        const url = this.apiUrl + '/api/Documento/CrearDocumento';
        return this.http.post(url, solicitud);
    }

    consultarCalidadMigratoria(): Observable<any> {
        const url = this.apiUrl + '/api/CalidadMigratoria/ConsultarCalidadMigratoria';
        return this.http.get(url);
    }

    consultarTipoConvenio(): Observable<any> {
        const url = this.apiUrl + '/api/TipoConvenio/ConsultarTipoConvenio';
        return this.http.get(url);
    }

    consultarTipoVisaPorConvenioCodigo(grupo: string): Observable<any> {
        const url = this.apiUrl + '/api/TipoVisa/ConsultarTipoVisaPorConvenioCodigo?convenioCodigo=' + grupo;
        return this.http.get(url);
    }

    ConsultarActividadDesarrollarPorTipoVisaCodigo(tipoVisaCodigo: string): Observable<any> {
        const url = this.apiUrl + '/api/ActividadDesarrollar/ConsultarActividadDesarrollarPorTipoVisaCodigo?tipoVisaCodigo=' + tipoVisaCodigo;
        return this.http.get(url);
    }



}