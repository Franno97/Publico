import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadAdministrativaComponent } from './unidad-administrativa.component';

describe('UnidadAdministrativaComponent', () => {
  let component: UnidadAdministrativaComponent;
  let fixture: ComponentFixture<UnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadAdministrativaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
