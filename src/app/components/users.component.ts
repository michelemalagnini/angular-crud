import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ModalUpsertComponent } from '../modals/modal-upsert.component';
import { ModalErrorComponent } from '../modals/modal-error.component';

import { Subject, Subscriber, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-users',
  template: `
    <h1>Fabrick Project</h1>
    <h3>Possible Actions: show users/add new user/delete user/edit user</h3>

    <!-- Button Add user to the list -->
    <div class="menu-border">
      <button mat-button (click)="openModalAddUser()">
        <mat-icon fontIcon="add"></mat-icon> Add New User
      </button>
    </div>
    <!-- user list  -->
    <app-user-list
      [users]="users"
      [showSpinner]="showSpinner"
      (editUser)="openModalEditUser($event)"
      (deleteUser)="deleteHandler($event)"
    ></app-user-list>
  `,
  styles: [
    `
      .menu-border {
        border-bottom: 1px solid #bdbdbdd1;
      }
    `,
  ],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  sub: Subscription = new Subscription();
  showSpinner = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  /**
   * Get All User
   */
  ngOnInit(): void {
    this.sub.add(
      this.userService.getUsers().subscribe({
        next: (res: User[]) => (this.users = res),
        error: (Error) => this.errorHandler(Error),
        complete: () => this.spinnerLoading(),
      })
    );
  }

  /**
   * Delete user
   */
  deleteHandler(idToRemove: number): void {
    this.sub.add(
      this.userService.deleteUser(idToRemove).subscribe({
        next: () =>
          (this.users = this.users.filter((u) => u.id !== idToRemove)),
        error: (Error) => this.errorHandler(Error),
        complete: () => this.spinnerLoading(),
      })
    );
  }

  /**
   * Open Modal: Edit User
   */
  openModalEditUser(user: Partial<User>): void {
    // Open Modal Edit
    const dialogRef = this.dialog.open(ModalUpsertComponent, {
      data: user,
    });
    // Close Event Handler
    dialogRef.afterClosed().subscribe((updatedUser: User) => {
      if (updatedUser) {
        this.editUser({ ...user, ...updatedUser });
      }
    });
  }

  /**
   * Edit User
   */
  editUser(user: User): void {
    this.sub.add(
      this.userService.editUser(user).subscribe({
        next: (res: User) =>
          (this.users = this.users.map((u) => {
            return u.id === res.id ? { ...u, ...res } : u;
          })),
        error: (Error) => this.errorHandler(Error),
        complete: () => this.spinnerLoading(),
      })
    );
  }

  /**
   * Open Modal: Add User
   */
  openModalAddUser(): void {
    // Open Modal Edit
    const dialogRef = this.dialog.open(ModalUpsertComponent, {
      data: null,
    });
    // Close Event Handler
    dialogRef.afterClosed().subscribe((newUser: User) => {
      if (newUser) {
        this.addUser(newUser);
      }
    });
  }

  /**
   * Add User
   */
  addUser(user: User): void {
    this.sub.add(
      this.userService.addUser(user).subscribe({
        next: (res: User) => {
          this.users = [res, ...this.users];
        },
        error: (Error) => this.errorHandler(Error),
        complete: () => this.spinnerLoading(),
      })
    );
  }

  private errorHandler(error: any): void {
    // /* do something with the error:
    //  */
    if (error.error && Array.isArray(error.error)) {
      const errorArray = error.error as Array<{
        field: string;
        message: string;
      }>;

      // pass the array of errors to a component to display them
      const dialogRef = this.dialog.open(ModalErrorComponent, {
        data: errorArray,
      });
    }
  }

  spinnerLoading() {
    this.showSpinner = true;
    // Simulate an asynchronous call that takes time
    setTimeout(() => {
      // call complete
      this.showSpinner = false;
    }, 1000); // Simulate 3 second delay
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
