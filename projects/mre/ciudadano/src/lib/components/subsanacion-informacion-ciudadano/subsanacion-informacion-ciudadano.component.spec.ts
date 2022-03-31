import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsanacionInformacionCiudadanoComponent } from './subsanacion-informacion-ciudadano.component';

describe('SubsanacionInformacionCiudadanoComponent', () => {
  let component: SubsanacionInformacionCiudadanoComponent;
  let fixture: ComponentFixture<SubsanacionInformacionCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsanacionInformacionCiudadanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsanacionInformacionCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
