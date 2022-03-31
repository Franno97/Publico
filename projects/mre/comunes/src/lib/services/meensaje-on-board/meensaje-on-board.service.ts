import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeensajeOnBoardService {
  mensajeArr:Array<Object>;
  mensajePopup:any;
  constructor() { 
    this.mensajeArr= [];
  }
  //nitificaciones
  showMensaje(mensaje:string,tipoMensaje:string){
    let data = {mensaje:mensaje,classMensaje:'bg-'+tipoMensaje};
    this.mensajeArr.push(data);
     timer(3000).subscribe(x=>{
        this.mensajeArr.splice(0,1);
     });
   }
   getMensajes(){
     return this.mensajeArr;
   }      
   //-------------------------------
   //popup de mensaje
   showMensajePopup(tituloMensaje:string,mensaje:string){
    this.mensajePopup = {formTitle:tituloMensaje,mensaje:mensaje};
   }
   getMensajePopup(){
     return this.mensajePopup;
   }
}
