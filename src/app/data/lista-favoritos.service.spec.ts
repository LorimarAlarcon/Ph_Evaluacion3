import { TestBed } from '@angular/core/testing';

import { ListaFavoritosService } from './lista-favoritos.service';

describe('ListaFavoritosService', () => {
  let service: ListaFavoritosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaFavoritosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
