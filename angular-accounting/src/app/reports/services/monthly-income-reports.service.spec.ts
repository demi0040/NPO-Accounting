import { TestBed } from '@angular/core/testing';

import { MonthlyIncomeReportsService } from './monthly-income-reports.service';

describe('MonthlyIncomeReportsService', () => {
  let service: MonthlyIncomeReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyIncomeReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
