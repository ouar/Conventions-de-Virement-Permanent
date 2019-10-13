import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// tslint:disable-next-line: max-line-length
import { EditPermanentTransferAgreementsComponent } from './components/permanentTransferAgreements/edit-permanent-transfer-agreements/edit-permanent-transfer-agreements.component';
// tslint:disable-next-line: max-line-length
import { CreatePermanentTransferAgreementsComponent } from './components/permanentTransferAgreements/create-permanent-transfer-agreements/create-permanent-transfer-agreements.component';
// tslint:disable-next-line: max-line-length
import { DeletePermanentTransferAgreementsComponent } from './components/permanentTransferAgreements/delete-permanent-transfer-agreements/delete-permanent-transfer-agreements.component';
// tslint:disable-next-line: max-line-length
import { ListPermanentTransferAgreementsComponent } from './components/permanentTransferAgreements/list-permanent-transfer-agreements/list-permanent-transfer-agreements.component';

const routes: Routes = [
  {
    path: 'permanent_transfer_agreements/create',
    component: CreatePermanentTransferAgreementsComponent
  },
  {
    path: 'permanent_transfer_agreements/detail/:permanentTransferAgreement',
    component: EditPermanentTransferAgreementsComponent
  },
  {
    path: 'permanent_transfer_agreements/delete/:id',
    component: DeletePermanentTransferAgreementsComponent
  },
  {
    path: 'permanent_transfer_agreements',
    component: ListPermanentTransferAgreementsComponent
  },
  {
    path: '',
    component: ListPermanentTransferAgreementsComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
