import { TestBed } from '@angular/core/testing';

import { ModalMontoService } from './modal-monto.service';

describe('ModalMontoService', () => {
  let service: ModalMontoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalMontoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
