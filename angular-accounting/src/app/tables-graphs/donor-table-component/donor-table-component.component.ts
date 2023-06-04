import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DonorDifferenceService } from '../services/donor-difference.service';

@Component({
  selector: 'app-donor-table-component',
  templateUrl: './donor-table-component.component.html',
  styleUrls: ['./donor-table-component.component.scss']
})
export class DonorTableComponentComponent implements OnInit {

  allColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'phone', 'address', 'postcode', 'donor_area', 'donor_group', 'promised_amount', 'promised_date', 'total_actual_income', 'difference'];

  displayedColumns: string[] = ['first_name', 'last_name', 'donor_area', 'donor_group', 'promised_amount', 'total_actual_income', 'difference'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _donorDifferenceService: DonorDifferenceService,
  ) { }

  ngOnInit(): void {
    this.getDonors();
  }

  getDonors() {
    this._donorDifferenceService.getDonors().subscribe({
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
