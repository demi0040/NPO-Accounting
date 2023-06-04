import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseComparisonComponentComponent } from './income-expense-comparison-component.component';

describe('IncomeExpenseComparisonComponentComponent', () => {
  let component: IncomeExpenseComparisonComponentComponent;
  let fixture: ComponentFixture<IncomeExpenseComparisonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeExpenseComparisonComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeExpenseComparisonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
