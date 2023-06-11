import { Component, OnInit } from '@angular/core';
import { MonthlyIncomeReportsService } from '../../services/monthly-income-reports.service';

@Component({
  selector: 'app-monthly-income-reports-tables',
  templateUrl: './monthly-income-reports-tables.component.html',
  styleUrls: ['./monthly-income-reports-tables.component.scss']
})
export class MonthlyIncomeReportsTablesComponent implements OnInit {

  monthlyIncomeByCategory: { month: string, data: any[] }[] = [];
  monthlyIncomeByPaymentMethod: { month: string, data: any[] }[] = [];
  monthlyIncomeBySourceName: { month: string, data: any[] }[] = [];

  constructor(private monthlyIncomeReportsService: MonthlyIncomeReportsService) { }

  ngOnInit() {
    this.fetchMonthlyIncomeData();
  }

  fetchMonthlyIncomeData() {
    this.monthlyIncomeReportsService.getMonthlyIncomeByCategory()
      .subscribe(data => {
        this.monthlyIncomeByCategory = this.groupDataByMonth(data);
      });

    this.monthlyIncomeReportsService.getMonthlyIncomeByPaymentMethod()
      .subscribe(data => {
        this.monthlyIncomeByPaymentMethod = this.groupDataByMonth(data);
      });

    this.monthlyIncomeReportsService.getMonthlyIncomeBySourceName()
      .subscribe(data => {
        this.monthlyIncomeBySourceName = this.groupDataByMonth(data);
      });
  }

  groupDataByMonth(data: any[]): { month: string, data: any[] }[] {
    const groupedData: { month: string, data: any[] }[] = [];

    // Group the data by month
    data.forEach(income => {
      const monthNumber = income.month;
      const monthName = this.getMonthName(monthNumber);
      const existingGroup = groupedData.find(group => group.month === monthName);

      if (existingGroup) {
        existingGroup.data.push(income);
      } else {
        groupedData.push({ month: monthName, data: [income] });
      }
    });

    return groupedData;
  }

  getMonthName(monthNumber: number): string {
    const date = new Date();
    date.setMonth(monthNumber - 1); // Months are zero-based in JavaScript Date object
    const monthName = date.toLocaleString('default', { month: 'long' });
    return monthName;
  }

}
