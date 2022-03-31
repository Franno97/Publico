import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPagoCiudadanoComponent } from './registro-pago-ciudadano.component';

describe('RegistroPagoCiudadanoComponent', () => {
  let component: RegistroPagoCiudadanoComponent;
  let fixture: ComponentFixture<RegistroPagoCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPagoCiudadanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPagoCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
