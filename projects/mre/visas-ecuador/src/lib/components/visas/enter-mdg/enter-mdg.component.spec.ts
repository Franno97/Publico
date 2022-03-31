import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterMDGComponent } from './enter-mdg.component';

describe('EnterMDGComponent', () => {
  let component: EnterMDGComponent;
  let fixture: ComponentFixture<EnterMDGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterMDGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterMDGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
