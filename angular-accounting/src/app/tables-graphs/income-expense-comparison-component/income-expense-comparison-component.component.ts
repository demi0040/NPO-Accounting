import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MonthlyIncomeService } from '../services/monthly-income.service';
import { MonthlyExpenseService } from '../services/monthly-expense.service';

@Component({
  selector: 'app-income-expense-comparison-component',
  templateUrl: './income-expense-comparison-component.component.html',
  styleUrls: ['./income-expense-comparison-component.component.scss']
})
export class IncomeExpenseComparisonComponentComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  private monthlyExpenseData: number[] = [];
  private monthlyIncomeData: number[] = [];


  constructor(
    private _monthlyExpenseService: MonthlyExpenseService,
    private _monthlyIncomeService: MonthlyIncomeService
  ) { }

  ngOnInit(): void {
    this.getMonthlyData();
  }

  getMonthlyData() {
    this._monthlyIncomeService.getMonthlyIncomes().subscribe(data => {

      data.forEach((income: { month: Date; total_income: number; }) => {

        const date = new Date(income.month);
        const month = date.getMonth();

        this.monthlyIncomeData[month] = income.total_income;
      });
    });

    this._monthlyExpenseService.getMonthlyExpenses().subscribe(data => {

      data.forEach((expense: { month: Date; total_expense: number; }) => {

        const date = new Date(expense.month);
        const month = date.getMonth();

        this.monthlyExpenseData[month] = expense.total_expense;
      });
      this.randomize();
    });
  }

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: { display: true },
    }
  };

  public barChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public barChartType: ChartType = 'line';

  public barChartData: ChartData<'line'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: this.monthlyIncomeData, label: 'Incomes' },
      { data: this.monthlyExpenseData, label: 'Expenses' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

}
