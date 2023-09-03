import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-error',
  template: `
    <h2 mat-dialog-title class="error-message">Error Message</h2>
    <mat-dialog-content class="mat-typography" style="min-width: 400px">
      <p>
        filed {{ error[0].field | uppercase }} :
        <span class="error-message">{{ error[0].message }}</span>
      </p>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Close</button>
      </mat-dialog-actions>
    </mat-dialog-content>
  `,
  styles: [
    `
      .error-message {
        color: red;
        font-weight: bold;
      }
    `,
  ],
})
export class ModalErrorComponent {
  constructor(
    private matDialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public error: any
  ) {}
}
