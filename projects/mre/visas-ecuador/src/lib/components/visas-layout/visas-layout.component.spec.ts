import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisasLayoutComponent } from './visas-layout.component';

describe('VisasLayoutComponent', () => {
  let component: VisasLayoutComponent;
  let fixture: ComponentFixture<VisasLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisasLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisasLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
