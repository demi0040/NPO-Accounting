import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyIncomeReportsTablesComponent } from './monthly-income-reports-tables.component';

describe('MonthlyIncomeReportsTablesComponent', () => {
  let component: MonthlyIncomeReportsTablesComponent;
  let fixture: ComponentFixture<MonthlyIncomeReportsTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyIncomeReportsTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyIncomeReportsTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
