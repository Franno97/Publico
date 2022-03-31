import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadAdministrativaService, UnidadAdministrativaInfoDto } from '@mre/unidad-administrativa/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { ServicioService, ServicioDto } from '@mre/unidad-administrativa/proxy/mre/sb/unidad-administrativa/servicio';
import { CitaDto, CitaService, GetCitaInput } from '../../proxy/cita';
import { PersonaService } from '@mre/registro-persona/proxy/mre/sb/registro-persona/persona';

@Component({
  selector: 'lib-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css'],
  providers: [
    ListService
  ],
})
export class CitaComponent implements OnInit {

  listaServicios: ServicioDto[];
  listaUnidadesAdministrativas: UnidadAdministrativaInfoDto[];
  listaCitas = { items: [], totalCount: 0 } as PagedResultDto<CitaDto>;


  constructor(
    public readonly servicioLista: ListService,
    private servicio: ServicioService,
    private administrateUnitService: UnidadAdministrativaService,
    private citaService: CitaService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    const request = this.servicio.getLookup(true);
    request.subscribe(respuesta => {
      this.listaServicios = respuesta.items;

      const requestUnidadesAdministrativas = this.administrateUnitService.getLookupAdministrativeUnit();
      requestUnidadesAdministrativas.subscribe(respuetaUnidadesAdministrativas => {
        this.listaUnidadesAdministrativas = respuetaUnidadesAdministrativas.items;
        this.cargarCitas();
      });
    });
  }

  cargarCitas() {
    let listaCitasTemporal = { items: [], totalCount: 0 } as PagedResultDto<CitaDto>;

    const personaRequest= this.personaService.obtenerPersonaActual();
    personaRequest.subscribe(personaDto => {
      let listaCitasTemporal = { items: [], totalCount: 0 } as PagedResultDto<CitaDto>;

      const request: GetCitaInput = {
        personaId: personaDto.id.toString(),
        maxResultCount: 1000
      }

      const serviceStreamCreator = this.citaService.getList(request).subscribe(
        response => {
          listaCitasTemporal = response;
        this.listaCitas.totalCount = listaCitasTemporal.totalCount;
        this.listaCitas.items = [];
  
        for (let i = 0; i < listaCitasTemporal.totalCount; i++) {
          const unidadAdministrativa = this.listaUnidadesAdministrativas.find(x => x.id === listaCitasTemporal.items[i].unidadAdministrativaId);
          const servicio = this.listaServicios.find(x => x.id === listaCitasTemporal.items[i].servicioId);
  
          const diaCita = new Date(listaCitasTemporal.items[i].diaCita);
  
  
          const cita: CitaDto = {
            id: listaCitasTemporal.items[i].id,
            estado: listaCitasTemporal.items[i].estado,
            unidadAdministrativaNombre: unidadAdministrativa !== null ? unidadAdministrativa.nombre : null,
            servicioNombre: servicio !== null ? servicio.nombre : null,
            diaCita: diaCita.getDate() + "/" + (diaCita.getMonth() + 1) + "/" + diaCita.getFullYear(),
            inicioHorario: listaCitasTemporal.items[i].inicioHorario,
            finHorario: listaCitasTemporal.items[i].finHorario,
            estadoNombre: listaCitasTemporal.items[i].estadoNombre,
            inicio:listaCitasTemporal.items[i].inicio
          };
          this.listaCitas.items.push(cita);
        }
        }
      );

    });

  }

  disponiblePorFecha(fechaCita: string): boolean {
    const fechaValidar = new Date(fechaCita);
    let fechaHoy = new Date();
    fechaHoy = new Date(fechaHoy.getFullYear(), fechaHoy.getMonth(), fechaHoy.getDate());
    
    return fechaValidar >= fechaHoy;
  }

  nuevaCita(): void {
    this.router.navigate(['/citas/adicionar']);
  }

  reagendarCita(id): void {
    this.router.navigate(['/citas/reagendar/', id]);
  }

  cancelarCita(id): void {
    this.confirmationService.warn('Cita::Cita:MensajeConfirmarCancelacion', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.citaService.cancelarById(id).subscribe(() => this.cargarCitas());
      }
    });
  }

}
