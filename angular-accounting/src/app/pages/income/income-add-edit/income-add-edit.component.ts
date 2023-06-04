import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { DonorService } from 'src/app/services/donor.service';
import { IncomeService } from 'src/app/services/income.service';
import { DonorAddEditComponent } from '../../donor/donor-add-edit/donor-add-edit.component';

@Component({
  selector: 'app-income-add-edit',
  templateUrl: './income-add-edit.component.html',
  styleUrls: ['./income-add-edit.component.scss']
})
export class IncomeAddEditComponent {
  incomeForm: FormGroup;
  donors: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _donorService: DonorService,
    private _dialogRef: MatDialogRef<IncomeAddEditComponent>,
    private _incomeService: IncomeService,
    private _donorAddEditDialog: MatDialogRef<DonorAddEditComponent>,
    private _dialog: MatDialog,
    private _snackbarService: SnackbarService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.incomeForm = this._fb.group({
      income_category: '',
      payment_method: '',
      income_source_name: '',
      income_amount: '',
      income_date: '',
      description: '',
      donor_id: '',
    });
  }

  ngOnInit(): void {
    this.incomeForm.patchValue(this.data);

    this.getDonors();
  }

  getFormControlValue(controlName: string): any {
    return this.incomeForm?.get(controlName)?.value;
  }

  openNewDonorDialog() {
    this.router.navigate(['/donor']);
    this._dialogRef.close();
    const dialogRef = this._dialog.open(DonorAddEditComponent, {
    });
  }

  onSubmit() {
    if (this.incomeForm.valid) {

      if (this.data) {
        this._incomeService.updateIncome(this.data.id, this.incomeForm.value).subscribe({
          next: (val: any) => {
            this._snackbarService.showSnackbar('Income updated successfully!', 'Success');
            this._dialogRef.close(true);
          },
          error: (err: any) => { console.error(err); },
        });
      }
      else {
        this._incomeService.addIncome(this.incomeForm.value).subscribe({
          next: (val: any) => {
            this._snackbarService.showSnackbar('Income added successfully!', 'Success');
            this._dialogRef.close(true);
          },
          error: (err: any) => { console.error(err); },
        });
      }
    }
  }

  getDonors() {
    this._donorService.getDonors().subscribe(
      (response) => {
        this.donors = response;
      },
      (error) => {
        console.error('Error retrieving donors:', error);
      }
    );
  }

  updateSourceName() {
    const donorID = this.incomeForm.get('donorID')?.value;
    const selectedDonor = this.donors.find(donor => donor.id === donorID);
    if (selectedDonor) {
      const sourceName = `${selectedDonor.firstName} ${selectedDonor.lastName}`;
      this.incomeForm.patchValue({ sourceName });
    }
  }
}
