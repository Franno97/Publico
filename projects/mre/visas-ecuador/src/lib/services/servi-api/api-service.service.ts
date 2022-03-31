import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { formularioVisasFull, DatoVisa } from '../../modelos/models';
import { Subsanacion } from '../../modelos/Subsanacion';


@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  // urlRequisitos = 'http://172.31.3.18/SharePointMensajes/api/tipoDocumental?titulo=';
  // urlCalidadMigratoria = "http://172.31.3.40:86/api/CalidadMigratoria/ConsultarCalidadMigratoria";
  // urlTipoConvenio = "http://172.31.3.40:86/api/TipoConvenio/ConsultarTipoConvenio";
  // urlTipoVisa_Convenio = "http://172.31.3.40:86/api/TipoVisa/ConsultarTipoVisaPorConvenioCodigo";
  // urlActividadDesarrollar = "http://172.31.3.40:86/api/ActividadDesarrollar/ConsultarActividadDesarrollarPorTipoVisaCodigo";
  // urlGuardarTramite="http://localhost:19557/api/Tramite/CrearTramite";
  // urlGuardarTramite = "http://172.31.3.40:86/api/Tramite/CrearTramite";
  urlGuardarSubsanacionTramite = "http://172.31.3.40:86/api/Tramite/ActualizarTramiteSubsanacion";
  // urlGuardarDocumentosZip = "http://172.31.3.18/requisitos/api/Requisito/GrabarDocumentoZipAsync";
  urlBuscarVisaPorNombre = "http://172.31.3.18/Externos/api/Esigex/BuscarVisaPorDatosPersona";
  urlCatalogoNacionalidad = "http://172.31.3.40:93/api/Catalogo/ConsultarCatalogoPorCodigo";

  constructor(private http: HttpClient) {

  }

  /* getMensajesInformativos(modulo: string, pagina: string): Observable<any> {
    const _headers: HttpHeaders = new HttpHeaders().append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    return this.http.get<any>("http://172.31.3.18/SharePointMensajes/api/Mensaje?modulo=" + modulo + "&pagina=" + pagina, { headers: _headers });
  } */

  /* getRequisitosFromSelection(tipoDocumento: string): Observable<any> {
    
    return this.http.get<any>(this.urlRequisitos + tipoDocumento);
  } */
  /* getCalidadMigratoria(): Observable<any> {
    return this.http.get<any>(this.urlCalidadMigratoria);
  } */
  /* getGrupoTipoConvenio(): Observable<any> {
    return this.http.get<any>(this.urlTipoConvenio);
  } */
  /* getGrupoTipoVisa_Convenio(grupo: string): Observable<any> {
    return this.http.get<any>(this.urlTipoVisa_Convenio + "?convenioCodigo=" + grupo);
  } */
  /* getActividadDesarrollar(tipoVisaCodigo: string): Observable<any> {
    return this.http.get<any>(this.urlActividadDesarrollar + "?tipoVisaCodigo=" + tipoVisaCodigo);
  } */

  /* guardarTramite(solicitud: formularioVisasFull): Observable<any> {
    return this.http.post(this.urlGuardarTramite, solicitud)
  } */


  guardarSubsanacionTramite(solicitud: Subsanacion): Observable<any> {
    return this.http.post(this.urlGuardarSubsanacionTramite, solicitud)
  }

  /* guardarDocumentoZip(solicitud: FormData): Observable<any> {
    //const _headers:HttpHeaders= new HttpHeaders().append('Content-disposition','multipart/form-data')
    return this.http.post(this.urlGuardarDocumentosZip, solicitud);
  } */
  buscarVisaPorNombre(DatoVisa: DatoVisa): Observable<any> {
    return this.http.post(this.urlBuscarVisaPorNombre, DatoVisa);
  }
  GetCatalogoNacionalidad(catalogoCabecera: any, codigo: any): Observable<any> {
    let URL = this.urlCatalogoNacionalidad + "?codigoCatalogo=" + catalogoCabecera + "&codigo=" + codigo;
    
    return this.http.get(URL);
  }
}
