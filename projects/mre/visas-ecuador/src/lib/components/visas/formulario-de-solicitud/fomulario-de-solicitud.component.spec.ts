import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FomularioDeSolicitudComponent } from './fomulario-de-solicitud.component';

describe('FomularioDeSolicitudComponent', () => {
  let component: FomularioDeSolicitudComponent;
  let fixture: ComponentFixture<FomularioDeSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FomularioDeSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FomularioDeSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
