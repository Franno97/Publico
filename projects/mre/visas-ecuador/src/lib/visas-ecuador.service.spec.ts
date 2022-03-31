import { TestBed } from '@angular/core/testing';

import { VisasEcuadorService } from './visas-ecuador.service';

describe('VisasEcuadorService', () => {
  let service: VisasEcuadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisasEcuadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
