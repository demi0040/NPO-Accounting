import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MonthlyDonationsService } from '../services/monthly-donations.service';

@Component({
  selector: 'app-donation-chart-component',
  templateUrl: './donation-chart-component.component.html',
  styleUrls: ['./donation-chart-component.component.scss']
})
export class DonationChartComponentComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  private monthlyDonationData: number[] = [];

  constructor(private _monthlyDonationService: MonthlyDonationsService) { }

  ngOnInit(): void {
    this.getMonthlyDonation();
  }

  getMonthlyDonation() {
    this._monthlyDonationService.getMonthlyDonations().subscribe(data => {

      data.forEach((donation: { month: Date; total_donations: number; }) => {

        const date = new Date(donation.month);
        const month = date.getMonth();

        this.monthlyDonationData[month] = donation.total_donations;
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
      { data: this.monthlyDonationData, label: 'Incomes' }
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
