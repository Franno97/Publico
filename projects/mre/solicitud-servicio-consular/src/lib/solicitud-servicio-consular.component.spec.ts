import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudServicioConsularComponent } from './solicitud-servicio-consular.component';

describe('SolicitudServicioConsularComponent', () => {
  let component: SolicitudServicioConsularComponent;
  let fixture: ComponentFixture<SolicitudServicioConsularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudServicioConsularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudServicioConsularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
