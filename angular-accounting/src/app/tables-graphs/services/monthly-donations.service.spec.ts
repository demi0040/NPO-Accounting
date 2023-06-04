import { TestBed } from '@angular/core/testing';

import { MonthlyDonationsService } from './monthly-donations.service';

describe('MonthlyDonationsService', () => {
  let service: MonthlyDonationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyDonationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
