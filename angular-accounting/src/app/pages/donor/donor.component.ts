import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DonorAddEditComponent } from './donor-add-edit/donor-add-edit.component';
import { DonorService } from 'src/app/services/donor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { ConfirmationService } from 'src/app/core/confirmation.service';
import { PageTitleService } from 'src/app/services/page-title.service';


@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss']
})
export class DonorComponent implements OnInit {

  allColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'phone', 'address', 'postcode', 'donor_area', 'donor_group', 'promised_amount', 'promised_date', 'action'];

  displayedColumns: string[] = ['first_name', 'last_name', 'phone', 'donor_area', 'donor_group', 'promised_amount', 'promised_date', 'action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _donorService: DonorService,
    private _snackbarService: SnackbarService,
    private _confirmationService: ConfirmationService,
    private _pageTitleService: PageTitleService
  ) {
    this.updatePageTitle();
  }

  updatePageTitle(): void {
    const newTitle = 'Donors Page'; // Set the desired page title
    this._pageTitleService.setPageTitle(newTitle);
  }

  ngOnInit(): void {
    this.getDonors();
  }

  openDialog() {
    const dialogRef = this._dialog.open(DonorAddEditComponent, {
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDonors();
        }
      }
    });
  }

  getDonors() {
    this._donorService.getDonors().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: console.log,
    })
  }

  deleteDonor(id: number) {
    const message = 'Are you sure you want to delete this donor?';

    this._confirmationService.openConfirmDialog(message)
      .then(result => {
        if (result) {
          // User confirmed the delete action
          this._donorService.deleteDonor(id).subscribe({
            next: (res) => {
              this._snackbarService.showSnackbar('Donor deleted successfully!', 'Success');
              this.getDonors();
            },
            error: console.log,
          });
        }
      });
  }

  openEditDialog(data: any) {
    const dialogRef = this._dialog.open(DonorAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDonors();
        }
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
