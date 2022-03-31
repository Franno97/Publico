import { EnvironmentService } from '@abp/ng.core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  SolicitudActualizarPagoServicio,
  SolicitudCalcularPagoServicio,
  SolicitudGuardarFormaPagoServicio,
  SolicitudObtenerPagoServicio,
  SolicitudRegistrarPagoServicio
} from '../../modelos/pagos-api-servicio-modelos';

@Injectable({
  providedIn: 'root'
})
export class PagosApiService {
  apiUrl = '';

  constructor(
    private http: HttpClient,
    private servicioEnvironment: EnvironmentService
  ) {
    this.apiUrl = this.servicioEnvironment.getApiUrl('Pago');
    this.apiUrl = this.apiUrl + '/api/Pago/'
  }

  postCalcularPago(solicitud: SolicitudCalcularPagoServicio): Observable<any> {
    let url = this.apiUrl + 'CalcularPago';
    return this.http.post(url, solicitud);
  }

  postObtenerPago(solicitud: SolicitudObtenerPagoServicio): Observable<any> {
    let url = this.apiUrl + 'ObtenerPago?idTramite=' + solicitud.idTramite
      + '&valoresMayoraCero=' + solicitud.valoresMayoraCero
      + '&facturarEn=' + solicitud.facturarEn;

    return this.http.post(url, null);
  }

  postGuardarFormaPago(solicitud: SolicitudGuardarFormaPagoServicio): Observable<any> {
    let url = this.apiUrl + 'GuardarFormaPago';
    return this.http.post(url, solicitud);
  }

  postRegistrarPago(solicitud: SolicitudRegistrarPagoServicio): Observable<any> {
    let url = this.apiUrl + 'RegistrarPago';
    return this.http.post(url, solicitud);
  }

  postActualizarPago(solicitud: SolicitudActualizarPagoServicio): Observable<any> {
    let url = this.apiUrl + 'ActualizarPago';
    return this.http.post(url, solicitud);
  }

}
