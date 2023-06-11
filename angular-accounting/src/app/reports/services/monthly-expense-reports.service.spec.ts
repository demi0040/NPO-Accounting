import { TestBed } from '@angular/core/testing';

import { MonthlyExpenseReportsService } from './monthly-expense-reports.service';

describe('MonthlyExpenseReportsService', () => {
  let service: MonthlyExpenseReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyExpenseReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
