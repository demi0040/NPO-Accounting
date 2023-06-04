import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-income-table-component',
  templateUrl: './income-table-component.component.html',
  styleUrls: ['./income-table-component.component.scss']
})
export class IncomeTableComponentComponent implements OnInit {

  allColumns: string[] = ['id', 'income_category', 'payment_method', 'income_amount', 'income_date', 'description', 'income_source_name'];

  displayedColumns: string[] = ['income_category', 'income_amount', 'income_date', 'income_source_name'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _incomeService: IncomeService
  ) { }

  ngOnInit(): void {
    this.getIncome();
  }

  getIncome() {
    this._incomeService.getIncomes().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
