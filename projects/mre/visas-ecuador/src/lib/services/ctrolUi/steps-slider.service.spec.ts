import { TestBed } from '@angular/core/testing';

import { StepsSliderService } from './steps-slider.service';

describe('StepsSliderService', () => {
  let service: StepsSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepsSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
