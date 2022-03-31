import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarPagoCiudadanoComponent } from './realizar-pago-ciudadano.component';

describe('RealizarPagoCiudadanoComponent', () => {
  let component: RealizarPagoCiudadanoComponent;
  let fixture: ComponentFixture<RealizarPagoCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealizarPagoCiudadanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarPagoCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
