import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from './../message/message.component';
import { PermanentTransferAgreementsService } from './../../../shared/services/permanent-transfer-agreements.service';
import { PermanentTransferAgreement } from 'src/app/shared/models/permanent-transfer-agreement';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PERIODICITIES } from '../../../shared/models/list-periodicity';
import { serialize } from 'json-typescript-mapper';
import { Creditor } from 'src/app/shared/models/creditor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-permanent-transfer-agreements',
  templateUrl: './create-permanent-transfer-agreements.component.html',
  styleUrls: ['./create-permanent-transfer-agreements.component.css']
})
export class CreatePermanentTransferAgreementsComponent implements OnInit {
  periodicities;
  createOVPForm: FormGroup;
  permanentTransferAgreement: PermanentTransferAgreement;

  constructor(
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public activeModal: NgbActiveModal,
    private permanentTransferAgreementsService: PermanentTransferAgreementsService
  ) {}

  ngOnInit() {
    this.periodicities = PERIODICITIES;
    this.createOVPForm = this.formBuilder.group({
      customerAccountNumber: ['', Validators.required],
      amount: ['0.0', Validators.required],
      creditorAccountNumber: ['', Validators.required],
      dueDate: ['', Validators.required],
      periodicityId: ['', Validators.required],
      teccCanalId: ['', Validators.required]
    });
  }

  createPermanentTransferAgreements() {
    this.permanentTransferAgreement = new PermanentTransferAgreement();
    this.permanentTransferAgreement.creditor = new Creditor();
    this.permanentTransferAgreement.creditor.accountNumber = this.createOVPForm.value.creditorAccountNumber;
    this.permanentTransferAgreement.teccCanalId = this.createOVPForm.value.teccCanalId;
    this.permanentTransferAgreement.periodicityId = this.createOVPForm.value.periodicityId;

    this.permanentTransferAgreement.amount = this.createOVPForm.value.amount;
    this.permanentTransferAgreement.customerAccountNumber = this.createOVPForm.value.customerAccountNumber;
    // tslint:disable-next-line: max-line-length
    const date = new Date(
      this.createOVPForm.value.dueDate.year,
      this.createOVPForm.value.dueDate.month - 1,
      this.createOVPForm.value.dueDate.day
    );
    this.permanentTransferAgreement.dueDate = this.datepipe.transform(
      date,
      'yyyy-MM-dd'
    );

    this.permanentTransferAgreementsService
      .createPermanentTransferAgreement(
        serialize(this.permanentTransferAgreement)
      )
      .subscribe(
        OVP => {
          this.permanentTransferAgreement = OVP;
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

  passBack() {
    this.activeModal.close();
  }
}
