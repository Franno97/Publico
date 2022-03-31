import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconocimientoFacialCiudadanoComponent } from './reconocimiento-facial-ciudadano.component';

describe('ReconocimientoFacialCiudadanoComponent', () => {
  let component: ReconocimientoFacialCiudadanoComponent;
  let fixture: ComponentFixture<ReconocimientoFacialCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconocimientoFacialCiudadanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconocimientoFacialCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
