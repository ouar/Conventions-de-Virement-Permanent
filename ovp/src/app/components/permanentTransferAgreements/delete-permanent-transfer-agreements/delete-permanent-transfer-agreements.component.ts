import { MessageComponent } from './../message/message.component';
import { PermanentTransferAgreementsService } from './../../../shared/services/permanent-transfer-agreements.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PermanentTransferAgreement } from 'src/app/shared/models/permanent-transfer-agreement';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-permanent-transfer-agreements',
  templateUrl: './delete-permanent-transfer-agreements.component.html',
  styleUrls: ['./delete-permanent-transfer-agreements.component.css']
})
export class DeletePermanentTransferAgreementsComponent implements OnInit {
  deleteOVPForm: FormGroup;
  permanentTransferAgreement: PermanentTransferAgreement;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public activeModal: NgbActiveModal,
    private permanentTransferAgreementsService: PermanentTransferAgreementsService
  ) {}

  ngOnInit() {
    this.deleteOVPForm = this.formBuilder.group({
      customerAccountNumber: ['', Validators.required],
      fenceReason: ['', Validators.required]
    });
  }

  deletePermanentTransferAgreements() {
    this.permanentTransferAgreementsService
      .deletePermanentTransferAgreement(
        this.deleteOVPForm.value.customerAccountNumber,
        this.deleteOVPForm.value.fenceReason,
        this.deleteOVPForm.value.customerAccountNumber
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
}
