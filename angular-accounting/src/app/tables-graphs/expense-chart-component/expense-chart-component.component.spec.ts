import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseChartComponentComponent } from './expense-chart-component.component';

describe('ExpenseChartComponentComponent', () => {
  let component: ExpenseChartComponentComponent;
  let fixture: ComponentFixture<ExpenseChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseChartComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
