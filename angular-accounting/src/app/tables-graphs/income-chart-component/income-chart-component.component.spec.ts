import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeChartComponentComponent } from './income-chart-component.component';

describe('IncomeChartComponentComponent', () => {
  let component: IncomeChartComponentComponent;
  let fixture: ComponentFixture<IncomeChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeChartComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
