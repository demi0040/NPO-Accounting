import { Component, OnInit } from '@angular/core';
import { MonthlyExpenseReportsService } from '../../services/monthly-expense-reports.service';

@Component({
  selector: 'app-monthly-expense-reports-tables',
  templateUrl: './monthly-expense-reports-tables.component.html',
  styleUrls: ['./monthly-expense-reports-tables.component.scss']
})
export class MonthlyExpenseReportsTablesComponent implements OnInit {

  monthlyExpenseByCategory: { month: string, data: any[] }[] = [];
  monthlyExpenseByPaymentMethod: { month: string, data: any[] }[] = [];
  monthlyExpenseByExpenseName: { month: string, data: any[] }[] = [];
  monthlyExpenseByPayeeInformation: { month: string, data: any[] }[] = [];

  constructor(private monthlyExpenseReportsService: MonthlyExpenseReportsService) { }

  ngOnInit() {
    this.fetchMonthlyExpenseData();
  }

  fetchMonthlyExpenseData() {
    this.monthlyExpenseReportsService.getMonthlyExpenseByCategory()
      .subscribe(data => {
        this.monthlyExpenseByCategory = this.groupDataByMonth(data);
      });

    this.monthlyExpenseReportsService.getMonthlyExpenseByPaymentMethod()
      .subscribe(data => {
        this.monthlyExpenseByPaymentMethod = this.groupDataByMonth(data);
      });

    this.monthlyExpenseReportsService.getMonthlyExpenseByExpenseName()
      .subscribe(data => {
        this.monthlyExpenseByExpenseName = this.groupDataByMonth(data);
      });

    this.monthlyExpenseReportsService.getMonthlyExpenseByPayeeInformation()
      .subscribe(data => {
        this.monthlyExpenseByPayeeInformation = this.groupDataByMonth(data);
      });
  }

  groupDataByMonth(data: any[]): { month: string, data: any[] }[] {
    const groupedData: { month: string, data: any[] }[] = [];

    data.forEach(expense => {
      const monthName = this.getMonthName(expense.month);
      const existingGroup = groupedData.find(group => group.month === monthName);

      if (existingGroup) {
        existingGroup.data.push(expense);
      } else {
        groupedData.push({ month: monthName, data: [expense] });
      }
    });

    return groupedData;
  }

  getMonthName(month: string): string {
    const [year, monthNumber] = month.split('-');
    const date = new Date(Number(year), Number(monthNumber) - 1, 1);
    const monthName = date.toLocaleString('default', { month: 'long' });

    return monthName;
  }

  getTotalExpenseAmount(expenses: any[]): number {
    return expenses.reduce((total, expense) => total + parseFloat(expense.total_expense_amount), 0);
  }
}
