import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { JsonFile } from 'projects/mre/visas-ecuador/src/lib/modelos/Subsanacion';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';


@Component({
  selector: 'lib-subir-archivo',
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.scss']
})
export class SubirArchivoComponent implements OnInit {

  @Input() Documentos: Array<any> = [];
  step = 0;
  classLoaded: Array<string> = [];
  @Output() InformacionTexto = new EventEmitter<string>();
  @Output() FileDocument = new EventEmitter<any>();
  isLoaded: boolean = true;
  @ViewChild('acc') accordion: NgbAccordion;
  requisitosDocumentosaSubir = [
    /*
    { observacion: "aa", Descripcion: "Suba imagen de Pasaporte", IconoNombre: "none", ImagenNombre:"pasaporte.png", TipoDocumento:"PASP" },
    { observacion: "bb", Descripcion: "Suba imagen de Cedula", IconoNombre: "none", ImagenNombre:"Cedula.png", TipoDocumento:"CEDU" },
    { observacion: "cc", Descripcion: "Suba imagen de Antecedentes", IconoNombre: "none",ImagenNombre:"Antecedente.png", TipoDocumento:"APEN" },
    */

  ];

  onDropFile(data: any) {
    data.preventDefault();
    this.uploadFile(data);
  }
  onDragOverFile(data: DragEvent) {
    data.stopPropagation();
    data.preventDefault();
  }
  selectFile(data: any, TipoDocumental: string) {

    var json: JsonFile = {
      file: data.target.files[0],
      tipoDocumental: TipoDocumental,
      maxElement: this.requisitosDocumentosaSubir.length
    }
    this.FileDocument.emit(json);
    let nombreAnterior = data.target.files[0].name;
    let extension = nombreAnterior.split(".").pop()
    if (extension == "pdf") {
      this.getBase64(data.target.files[0]).then(
        data => {
          const base64String = data.toString();
          let temp = "VisorPdf" + this.step;
          this.requisitosDocumentosaSubir[this.step].VisorPdf = base64String.replace("data:", "").replace(/^.+,/, "");
          this.requisitosDocumentosaSubir[this.step].IsVisible = false;

          //let visor = document.getElementById(temp);
          //visor?.setAttribute('base64Src', base64String.replace("data:", "").replace(/^.+,/, ""));
          //this.dirFicheroPdf=base64String.replace("data:", "").replace(/^.+,/, "");

        }

      );
    }
    else {
      this.uploadFile(data);
      this.requisitosDocumentosaSubir[this.step].IsVisible = true;
    }

    // this.classLoaded[this.step] = "green";
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  uploadFile(event: any) {

    var file = event.target.files[0];

    var reader = new FileReader();
    var tg;
    var cad = 'imgLoad' + this.step;
    reader.onload = function (event: any) {
      var img = document.getElementById(cad);
      tg = event.target.result;

      img?.setAttribute('src', event.target.result);
    }
    reader.readAsDataURL(file);


  }

  constructor() {
    this.InformacionTexto.emit("");
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }
  prevStep(stepcurrent) {
    stepcurrent--;
    // this.step=stepcurrent;
    setTimeout(() => this.accordion.toggle(stepcurrent), 0);
  }

  toggle(stepcurrent) {

    stepcurrent++;
    // this.step=stepcurrent;
    setTimeout(() => this.accordion.toggle(stepcurrent), 0);
  }
  ngOnInit(): void {

    for (let index = 0; index < this.Documentos.length; index++) {
      if (this.Documentos[index].observacion != "") {
        this.requisitosDocumentosaSubir.push({ TipoDocumento: this.Documentos[index].tipoDocumento, Descripcion: this.Documentos[index].descripcionDocumento, IconoNombre: this.Documentos[index].iconoNombre, ImagenNombre: this.Documentos[index].imagenNombre, observacion: this.Documentos[index].observacion, IsVisible: false, VisorPdf: "" });
      }
    }

    if (this.requisitosDocumentosaSubir.length > 0) {
      this.InformacionTexto.emit(this.requisitosDocumentosaSubir[0].observacion);
    }
  }
  beforeChange(event) {
    this.step = event.panelId;
    this.InformacionTexto.emit(this.requisitosDocumentosaSubir[event.panelId].observacion);

  }
}
