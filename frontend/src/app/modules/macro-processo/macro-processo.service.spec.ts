import { TestBed } from '@angular/core/testing';

import { MacroProcessoService } from './macro-processo.service';

describe('MacroProcessoService', () => {
  let service: MacroProcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MacroProcessoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
