import { Injectable } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private _confirmDialog: MatDialog) { }

  openConfirmDialog(message: string): Promise<boolean> {
    const dialogRef = this._confirmDialog.open(ConfirmationDialogComponent, {
      width: '480px',
      data: message
    });

    return dialogRef.afterClosed().toPromise();
  }
}
