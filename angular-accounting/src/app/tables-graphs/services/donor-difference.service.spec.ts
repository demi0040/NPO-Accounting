import { TestBed } from '@angular/core/testing';

import { DonorDifferenceService } from './donor-difference.service';

describe('DonorDifferenceService', () => {
  let service: DonorDifferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorDifferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
