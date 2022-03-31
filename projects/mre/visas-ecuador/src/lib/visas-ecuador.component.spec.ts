import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisasEcuadorComponent } from './visas-ecuador.component';

describe('VisasEcuadorComponent', () => {
  let component: VisasEcuadorComponent;
  let fixture: ComponentFixture<VisasEcuadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisasEcuadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisasEcuadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
