import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsanarPagoCiudadanoComponent } from './subsanar-pago-ciudadano.component';

describe('SubsanarPagoCiudadanoComponent', () => {
  let component: SubsanarPagoCiudadanoComponent;
  let fixture: ComponentFixture<SubsanarPagoCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsanarPagoCiudadanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsanarPagoCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
