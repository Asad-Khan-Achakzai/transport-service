import { TestBed } from '@angular/core/testing';

import { MixedService } from './mixed.service';

describe('MixedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MixedService = TestBed.get(MixedService);
    expect(service).toBeTruthy();
  });
});
