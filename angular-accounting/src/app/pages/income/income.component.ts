import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IncomeAddEditComponent } from './income-add-edit/income-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { DonorService } from 'src/app/services/donor.service';
import { IncomeService } from 'src/app/services/income.service';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { ConfirmationService } from 'src/app/core/confirmation.service';
import { PageTitleService } from 'src/app/services/page-title.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  allColumns: string[] = ['id', 'income_category', 'payment_method', 'income_amount', 'income_date', 'description', 'income_source_name', 'action'];

  displayedColumns: string[] = ['income_category', 'payment_method', 'income_amount', 'income_date', 'income_source_name', 'description', 'action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _donorService: DonorService,
    private _incomeService: IncomeService,
    private _snackbarService: SnackbarService,
    private _confirmationService: ConfirmationService,
    private _pageTitleService: PageTitleService
  ) {
    this.updatePageTitle();
  }

  updatePageTitle(): void {
    const newTitle = 'Income Page'; // Set the desired page title
    this._pageTitleService.setPageTitle(newTitle);
  }

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

  openDialog() {
    const dialogRef = this._dialog.open(IncomeAddEditComponent, {});

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getIncome();
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteIncome(income: any) {
    const message = 'Are you sure you want to delete this Income?';

    this._confirmationService.openConfirmDialog(message)
      .then(result => {
        if (result) {
          console.log(income.id)
          console.log(income)

          this._incomeService.deleteIncome(income.id).subscribe({
            next: (res) => {
              this._snackbarService.showSnackbar('Income deleted successfully!', 'Success');
              this.getIncome();
            },
            error: console.log,
          });
        }
      });
  }

  openEditDialog(data: any) {
    const dialogRef = this._dialog.open(IncomeAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getIncome();
        }
      },
    });
  }

}
