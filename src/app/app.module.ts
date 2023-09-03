import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from './material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './components/users.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalUpsertComponent } from './modals/modal-upsert.component';
import { ModalErrorComponent } from './modals/modal-error.component';
import { UserCardListComponent } from './components/users-card-list.component';
import { CapitalizeWordsPipe } from './pipelines/capitalize-words.pipe';

@NgModule({
  declarations: [
    UsersComponent,
    ModalUpsertComponent,
    ModalErrorComponent,
    UserCardListComponent,
    CapitalizeWordsPipe,
  ],
  imports: [
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [UsersComponent],
})
export class AppModule {}
