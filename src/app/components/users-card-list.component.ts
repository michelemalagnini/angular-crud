import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-list',
  template: `
    <ng-container *ngIf="!showSpinner">
      <mat-list *ngIf="users.length > 0 && !showSpinner">
        <mat-list-item *ngFor="let user of users">
          <div class="list row">
            <div
              [ngClass]="{
                male: user.gender === 'male',
                female: user.gender === 'female'
              }"
            >
              <div matListItemTitle>{{ user.name | capitalizeWords }}</div>
              <div matListItemLine>
                {{ user.email | capitalizeWords }}
              </div>
            </div>
            <div>
              <button mat-icon-button (click)="editUser.emit(user)">
                <mat-icon fontIcon="edit"></mat-icon>
              </button>
              <button
                mat-icon-button
                *ngIf="user.id"
                (click)="deleteUser.emit(user.id)"
              >
                <mat-icon fontIcon="delete"></mat-icon>
              </button>
            </div>
          </div>
        </mat-list-item>
      </mat-list>
      <h1 *ngIf="users.length === 0" class="center-text">
        No users to display.
      </h1>
    </ng-container>
    <ng-container *ngIf="showSpinner">
      <mat-spinner class="spinner-container"></mat-spinner>
      <h1 class="center-text">Loading ...</h1>
    </ng-container>
  `,
  styles: [
    `
      .list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
      }
      .center-text {
        text-align: center;
        margin-top: 50px;
      }
      .center-text-loading {
        text-align: center;
        margin-top: 200px;
      }
      .male {
        border: 2px solid #36caff;
        border-right: none;
        border-bottom: none;
        border-left: none;
      }
      .female {
        border: 2px solid pink;
        border-right: none;
        border-bottom: none;
        border-left: none;
      }
      .spinner-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .list:hover {
        background-color: rgba(255, 255, 0, 0.3);
        transform: translateX(5px);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class UserCardListComponent {
  // this is  a dumb component to show the user list
  @Input() users: User[] = [];
  @Input() showSpinner: boolean = false;
  @Output() editUser = new EventEmitter<any>();
  @Output() deleteUser = new EventEmitter<number>();
}
