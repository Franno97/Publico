import { TestBed } from '@angular/core/testing';
import { SolicitudServicioConsularService } from './solicitud-servicio-consular.service';

describe('SolicitudServicioConsularService', () => {
  let service: SolicitudServicioConsularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudServicioConsularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
