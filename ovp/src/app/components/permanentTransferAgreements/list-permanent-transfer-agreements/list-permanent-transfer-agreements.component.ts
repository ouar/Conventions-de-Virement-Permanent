import { MessageComponent } from './../message/message.component';
import { GlobalService } from './../../../shared/services/global.service';
import { Subscription } from 'rxjs';
import { deserialize } from 'json-typescript-mapper';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermanentTransferAgreementsService } from '../../../shared/services/permanent-transfer-agreements.service';
import { PermanentTransferAgreement } from 'src/app/shared/models/permanent-transfer-agreement';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-permanent-transfer-agreements',
  templateUrl: './list-permanent-transfer-agreements.component.html',
  styleUrls: ['./list-permanent-transfer-agreements.component.css']
})
export class ListPermanentTransferAgreementsComponent
  implements OnInit, OnDestroy { 
  obs: Subscription;
  permanentTransferAgreementForm: FormGroup;
  listPermanentTransferAgreements: Array<PermanentTransferAgreement> = [];
  private subscription: Subscription;
  constructor(
    private permanentTransferAgreementsService: PermanentTransferAgreementsService,
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {   
    if (this.globalService.ListPermanentTransferAgreements) {
      this.permanentTransferAgreementForm = this.globalService.ListPermanentTransferAgreements;
    } else {
      this.permanentTransferAgreementForm = this.formBuilder.group({
        accountNumber: ['', Validators.required],
        amountMin: ['0.0', Validators.required],
        amountMax: ['999999999.999', Validators.required]
      });
    }

    this.subscription = this.permanentTransferAgreementsService.Array.subscribe(
      state => {
        this.listPermanentTransferAgreements = state;
      }
    );
  }
  findPermanentTransferAgreements() {
    this.obs = this.permanentTransferAgreementsService
      .findPermanentTransferAgreements(
        this.permanentTransferAgreementForm.value
      )
      .subscribe(
        listOVP => {
          this.listPermanentTransferAgreements = [];
          listOVP.forEach(ovp => {
            this.listPermanentTransferAgreements.push(
              deserialize(PermanentTransferAgreement, ovp)
            );
          });
          this.permanentTransferAgreementsService.initListOVP(
            this.listPermanentTransferAgreements
          );
        },
        error => {
          this.dialog.open(MessageComponent, {
            data: {
              message: error.message
            }
          });
        }
      );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.obs) {
      this.obs.unsubscribe();
    }
    this.globalService.ListPermanentTransferAgreements = this.permanentTransferAgreementForm;
  }
}
