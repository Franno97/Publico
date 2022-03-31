import { Injectable } from '@angular/core';
import { PersonaDto } from '@mre/registro-persona/proxy/mre/sb/registro-persona/persona';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepsSliderService {
  headerSteps = [
    {link:"Seleccionar el Tipo de Visa",status:true}, 
    {link:"Ingrese número MDG",status:false}, 
    {link:"Formulario de Solicitud",status:false}, 
    {link:"Adjuntar requisitos para la visa",status:false}, 
];
tipoDocumento:string = 'Personal';
Imagen:string = '';
dataPersona:PersonaDto={}as any;
tipoVisa:string;
setUnidadAdmin={}as any
private dtoPerson=new BehaviorSubject<PersonaDto>({} as any); 
  activeStepper:number = 0;
  private _activeStepper:number = 1;
  constructor() { }
  
  getHeaderSteps() {
    return this.headerSteps;
  }
  setStatusStepHeader(i: number) {
    this.headerSteps[i].status = true;
  }
  setActiveStepper(i: number) {
    this.activeStepper = i;
  }
  setPersonalStatus() {
    this.headerSteps[1].status = false;
    this.headerSteps[2].status = false;
    this.headerSteps[3].status = false;
  }
  getPreviousActiveStepper() {
    return this._activeStepper;
  }
  //seccion para tipo de documento seleccionado
  // --------------------------------------------------
  setTipoDocumento(data: string) {
    this.tipoDocumento = data;
  }
  getTipoDocumento(): string {
    return this.tipoDocumento;
  }
  getActiveStepper() {
    return this.activeStepper;
  }
  //seccion para imagen
  // --------------------------------------------------
  setTipoImagen(data: string) {
    this.Imagen = data;
  }
  getImagen(): string {
    return this.Imagen;
  }
  //seccion ti po de visa
  // --------------------------------------------------
  setTipoVisa(data: string) {
    this.tipoVisa = data;
  }
  getTipoVisa(): string {
    return this.tipoVisa;
  }
  //seccion Enviar DTOpersona
  // --------------------------------------------------
  setPersonDto(data: PersonaDto) {

    this.dataPersona = data;

  }
  getPersonDto() {
    this.dtoPerson.next(this.dataPersona as PersonaDto);
  }
  getPersonDt$(): Observable<PersonaDto> {
    return this.dtoPerson.asObservable();
  }
  // --------------------------------------------------
  setUnidadAdministrativa(data: any) {
    this.setUnidadAdmin = data;
  }
  getUnidadAdministrativa(): string {
    return this.setUnidadAdmin;
  }
}
