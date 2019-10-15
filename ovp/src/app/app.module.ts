import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
// tslint:disable-next-line: max-line-length
import { EditPermanentTransferAgreementsComponent } from './components/permanentTransferAgreements/edit-permanent-transfer-agreements/edit-permanent-transfer-agreements.component';
// tslint:disable-next-line: max-line-length
import { CreatePermanentTransferAgreementsComponent } from './components/permanentTransferAgreements/create-permanent-transfer-agreements/create-permanent-transfer-agreements.component';
// tslint:disable-next-line: max-line-length
import { DeletePermanentTransferAgreementsComponent } from './components/permanentTransferAgreements/delete-permanent-transfer-agreements/delete-permanent-transfer-agreements.component';
// tslint:disable-next-line: max-line-length
import { ListPermanentTransferAgreementsComponent } from './components/permanentTransferAgreements/list-permanent-transfer-agreements/list-permanent-transfer-agreements.component';
import { MessageComponent } from './components/permanentTransferAgreements/message/message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EditPermanentTransferAgreementsComponent,
    CreatePermanentTransferAgreementsComponent,
    DeletePermanentTransferAgreementsComponent,
    ListPermanentTransferAgreementsComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MessageComponent
  ]
})
export class AppModule { }
