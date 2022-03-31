import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UnidadAdministrativaService } from '@mre/unidad-administrativa/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { GeograficaService } from '@mre/unidad-administrativa/proxy/mre/sb/unidad-administrativa/geografica';
import { ServicioService, TipoServicioLookupDto } from '@mre/unidad-administrativa/proxy/mre/sb/unidad-administrativa/servicio';
import { StepsSliderService } from 'projects/mre/visas-ecuador/src/lib/services/ctrolUi/steps-slider.service';

@Component({
  selector: 'lib-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss']
})
export class FormLayoutComponent implements OnInit {
  formTitle = "Seleccione servicion consular";
  arrSelect = [
    { selectName: "Tipo de servicio", control: "select1", name: "", arrOptionSelect: [] },
    { selectName: "Pais", control: "select2", name: "", arrOptionSelect: [] },
    { selectName: "Oficina consular", control: "select3", name: "", arrOptionSelect: [] },
  ];
  listaTipoServicio: TipoServicioLookupDto[];
  tipoDeServicio: any = '';
  pais: any = '';
  oficinaConsular: any = '';
  ServicioConsularFormulario: FormGroup;
  idServicio: string = "";
  codePais: string = "";
  bandera1: boolean = true;
  bandera2: boolean = false;

  procesando = false;

  constructor(private router: Router,
    private ServiceGoegraphical: GeograficaService,
    private UnidadAdministrativaService: UnidadAdministrativaService,
    private servicio: ServicioService,
    private stepService: StepsSliderService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bandera1 = true;
    this.bandera2 = false;
    this.ServicioConsularFormulario = this.fb.group({
      select1: ['0', Validators.required],
      select2: ['0', Validators.required],
      select3: ['0', Validators.required]
    });
    /* this.cargarTipoServicio();
    this.cargarPaises();
    this.cargarOficinaConsular("6c714cb7-34c5-514d-20da-3a0113e0bd02", "ECU"); */
    this.cargarDatos();
  }

  goToNewLink() {
    this.router.navigate(['/preguntas-frecuentes']);
  }

  asignarValor(e: any, i: number) {
    switch (i) {
      case 1:
        this.tipoDeServicio = this.ServicioConsularFormulario.get('select1').value;
        this.codePais = this.ServicioConsularFormulario.get('select2').value;
        if (e.target.value != 0) {
          this.cargarOficinaConsular(this.tipoDeServicio, this.codePais)
        }
        break;
      case 2:
        this.pais = e.target.textContent;
        this.tipoDeServicio = this.ServicioConsularFormulario.get('select1').value;
        this.codePais = this.ServicioConsularFormulario.get('select2').value;
        if (e.target.value != 0) {
          this.cargarOficinaConsular(this.tipoDeServicio, this.codePais)
        }
        break;
      case 3:
        this.arrSelect[2].arrOptionSelect.forEach(element => {
          if (element.id == this.ServicioConsularFormulario.get('select3').value) {
            this.oficinaConsular = element.name;
          }
        });
        break;
    }
  }

  // Carga los datos de los combos
  cargarDatos(): void {
    this.procesando = true;
    this.cargarPaises();
  }

  cargarPaises() {
    const requestPais = this.ServiceGoegraphical.getCountries();
    requestPais.subscribe(respuesta => {

      for (let i = 0; i < respuesta.items.length; i++) {
        let id = respuesta.items[i].code;
        let name = respuesta.items[i].name;
        this.arrSelect[1].arrOptionSelect.push({ id: id, name: name });
      }
      this.arrSelect[1].name = "ECU";
      this.codePais = "ECU";
      this.pais = "Ecuador";
      this.cargarTipoServicio();
    });
  }

  cargarTipoServicio() {
    const request1 = this.servicio.getLookup(true);
    request1.subscribe(respuesta => {

      for (let i = 0; i < respuesta.items.length; i++) {
        let id = respuesta.items[i].id;
        let name = respuesta.items[i].nombre;

        this.arrSelect[0].arrOptionSelect.push({ id: id, name: name });

      }

      this.arrSelect[0].name = "6c714cb7-34c5-514d-20da-3a0113e0bd02";
      this.idServicio = "6c714cb7-34c5-514d-20da-3a0113e0bd02";

      this.cargarOficinaConsular("6c714cb7-34c5-514d-20da-3a0113e0bd02", "ECU");
    });
  }

  cargarOficinaConsular(idServicio: string, codePais: string) {

    const request = this.UnidadAdministrativaService.obtenerUnidadAdministrativaPorServicioPais(idServicio, codePais);
    request.subscribe(respuesta => {

      this.ServicioConsularFormulario.controls['select3'].setValue(null);

      for (let i = 0; i < respuesta.items.length; i++) {
        let id = respuesta.items[i].id;
        let name = respuesta.items[i].nombre;
        this.arrSelect[2].arrOptionSelect.push({ id: id, name: name });
      }
      this.procesando = false;
    });
  }

  onSubmit() {
    this.bandera1 = false;
    this.bandera2 = false;
    switch (this.ServicioConsularFormulario.get('select1').value) {
      case '6c714cb7-34c5-514d-20da-3a0113e0bd02':
        this.bandera2 = true;
        break;
      default: {
        this.bandera1 = true;
        break;
      }

    }

    const data = {
      paisConsular: this.pais,
      oficinaConsular: this.oficinaConsular,
      IdServicio: this.ServicioConsularFormulario.get('select1').value,
      IdcodePais: this.ServicioConsularFormulario.get('select2').value,
      IdUnidadAministrativa: this.ServicioConsularFormulario.get('select3').value
    }

    this.stepService.setUnidadAdministrativa(data);
    //this.goToNewLink();
  }

}
