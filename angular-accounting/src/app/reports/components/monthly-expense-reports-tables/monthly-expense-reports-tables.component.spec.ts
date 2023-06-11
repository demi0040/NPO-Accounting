import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyExpenseReportsTablesComponent } from './monthly-expense-reports-tables.component';

describe('MonthlyExpenseReportsTablesComponent', () => {
  let component: MonthlyExpenseReportsTablesComponent;
  let fixture: ComponentFixture<MonthlyExpenseReportsTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyExpenseReportsTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyExpenseReportsTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
