import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageOnBoardComponent } from '../../components/sharedcomponents/message-on-board/message-on-board.component';

enum bgSnackBar {
  success = "bg-success",
  danger = "bg-danger",
  info = "bg-info",
  warning = "bg-warning"
};
@Injectable({
  providedIn: 'root'
})
export class MessageBoardService {
  typeMessage:string = 'success';
  message:string = 'succes'; 
  constructor(private _snackBar: MatSnackBar) { }
  showMessage(typeMessage:string,message:string){
      this.setMessage(typeMessage,message); 
      this._snackBar.openFromComponent(MessageOnBoardComponent,{
        duration: 2000,
        horizontalPosition:'start',
        verticalPosition:'top',
        panelClass:[this.getBoostratClassFor(typeMessage)]
      });
  }
  closeMessage(){
    this._snackBar.dismiss();
  }
  private getBoostratClassFor(data:string){
   switch (data) {
     case "success": return bgSnackBar['success'];
     case "danger": return bgSnackBar['danger'];
     case "warning": return bgSnackBar['warning'];
     case "info": return bgSnackBar['info'];
     default:  return bgSnackBar['success'];
   } 
  }
  private setMessage(typeMessage:string,message:string){
    this.typeMessage = typeMessage;
    this.message = message;
  }
  getMessage(){
    return {
              typeMessage:this.typeMessage,
              message:this.message
           };
  }
}