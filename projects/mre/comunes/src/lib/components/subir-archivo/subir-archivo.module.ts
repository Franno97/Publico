import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubirArchivoComponent } from './subir-archivo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from '@mre/comunes';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [
    SubirArchivoComponent
  ],
  imports: [
    CommonModule,
    InputFieldModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    NgbModule,
    NgxExtendedPdfViewerModule,
  ],
  exports:[SubirArchivoComponent]
})
export class SubirArchivoModule { }
