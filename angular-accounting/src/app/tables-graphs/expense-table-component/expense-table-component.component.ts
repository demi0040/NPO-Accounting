import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-table-component',
  templateUrl: './expense-table-component.component.html',
  styleUrls: ['./expense-table-component.component.scss']
})
export class ExpenseTableComponentComponent implements OnInit {

  allColumns: string[] = ['id', 'expense_name', 'payment_method', 'expense_category', 'payee_information', 'expense_amount', 'expense_date', 'expense_description'];

  displayedColumns: string[] = ['expense_name', 'payee_information', 'expense_amount', 'expense_date'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses() {
    this._expenseService.getExpenses().subscribe({
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
