import { TestBed } from '@angular/core/testing';

import { UnidadAdministrativaService } from './unidad-administrativa.service';

describe('UnidadAdministrativaService', () => {
  let service: UnidadAdministrativaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadAdministrativaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
