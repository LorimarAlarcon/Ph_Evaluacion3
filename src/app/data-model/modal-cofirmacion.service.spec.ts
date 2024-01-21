import { TestBed } from '@angular/core/testing';

import { ModalConfirmacionService } from './modal-cofirmacion.service';

describe('ModalCofirmacionService', () => {
  let service: ModalConfirmacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalConfirmacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
