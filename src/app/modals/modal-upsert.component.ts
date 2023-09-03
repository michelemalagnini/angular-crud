import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-upsert',
  template: `
    <h2 mat-dialog-title>User Form</h2>
    <mat-dialog-content class="mat-typography">
      <form (ngSubmit)="saveHandler()" [formGroup]="form">
        <mat-form-field>
          <mat-label>Name Surname</mat-label>
          <input matInput type="text" formControlName="name" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Email</mat-label>
          <input matInput type="text" formControlName="email" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Gender</mat-label>
          <mat-select formControlName="gender">
            <mat-option value="male">Male</mat-option>
            <mat-option value="female">Female</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-radio-group formControlName="status">
          <mat-radio-button value="active">Active</mat-radio-button>
          <mat-radio-button value="inactive">Inactive</mat-radio-button>
        </mat-radio-group>

        <mat-dialog-actions align="start">
          <button mat-button mat-dialog-close>Cancel</button>
          <button
            mat-button
            (click)="saveHandler()"
            cdkFocusInitial
            [disabled]="form.invalid"
          >
            Confirm
          </button>
        </mat-dialog-actions>
      </form>
    </mat-dialog-content>
  `,
})
export class ModalUpsertComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    gender: ['', Validators.required],
    status: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    // Populate the form with received data
    this.form.patchValue(user);
  }

  saveHandler(): void {
    // close the modal passing the updated form value
    this.matDialog.close(this.form.value);
  }
}
