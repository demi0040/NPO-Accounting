import { TestBed } from '@angular/core/testing';

import { MonthlyIncomeService } from './monthly-income.service';

describe('MonthlyIncomeService', () => {
  let service: MonthlyIncomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyIncomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
