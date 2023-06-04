import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-donor-add-edit',
  templateUrl: './donor-add-edit.component.html',
  styleUrls: ['./donor-add-edit.component.scss']
})
export class DonorAddEditComponent implements OnInit {
  donorForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _donorService: DonorService,
    private _dialogRef: MatDialogRef<DonorAddEditComponent>,
    private _snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.donorForm = this._fb.group({
      first_name: '',
      last_name: '',
      address: '',
      postcode: '',
      phone: '',
      email: '',
      donor_area: '',
      donor_group: '',
      promised_amount: '',
      promised_date: '',
    });

  }

  ngOnInit(): void {
    this.donorForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.donorForm.valid) {

      if (this.data) {
        this._donorService.updateDonor(this.data.id, this.donorForm.value).subscribe({
          next: (val: any) => {
            this._snackbarService.showSnackbar('Donor updated successfully!', 'Success');
            this._dialogRef.close(true);
          },
          error: (err: any) => { console.error(err); },
        });
      }
      else {
        this._donorService.addDonor(this.donorForm.value).subscribe({
          next: (val: any) => {
            this._snackbarService.showSnackbar('Donor added successfully!', 'Success');
            this._dialogRef.close(true);
          },
          error: (err: any) => { console.error(err); },
        });
      }
    }
  }

}
