import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeVisaComponent } from './tipo-de-visa.component';

describe('TipoDeVisaComponent', () => {
  let component: TipoDeVisaComponent;
  let fixture: ComponentFixture<TipoDeVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoDeVisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
