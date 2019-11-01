import { MessageComponent } from './../message/message.component';
import { PermanentTransferAgreementsService } from './../../../shared/services/permanent-transfer-agreements.service';
import { PermanentTransferAgreement } from 'src/app/shared/models/permanent-transfer-agreement';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { PERIODICITIES } from '../../../shared/models/list-periodicity';
import { serialize } from 'json-typescript-mapper';
import { Creditor } from 'src/app/shared/models/creditor';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { DAYOFWEEK } from 'src/app/shared/models/list-day-of-week';

@Component({
  selector: 'app-create-permanent-transfer-agreements',
  templateUrl: './create-permanent-transfer-agreements.component.html',
  styleUrls: ['./create-permanent-transfer-agreements.component.css']
})
export class CreatePermanentTransferAgreementsComponent
  implements OnInit, OnDestroy {
  protected periodicities;
  protected createOVPForm: FormGroup;
  private permanentTransferAgreement: PermanentTransferAgreement;
  private createPermanentTransferAgreement$: Subscription;
  @Output() createModalCloseEmitter = new EventEmitter<string>();

  constructor(
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private permanentTransferAgreementsService: PermanentTransferAgreementsService
  ) {}

  ngOnInit() {
    this.periodicities = PERIODICITIES;
    this.createOVPForm = this.formBuilder.group({
      customerAccountNumber: ['', Validators.required],
      amount: ['0.0', Validators.required],
      creditorAccountNumber: ['', Validators.required],
      creditorBic: ['', Validators.required],
      creditorName: ['', Validators.required],
      dueDate: ['', Validators.required],
      periodicityId: ['', Validators.required],
      teccCanalId: ['']
    });
  }
  ngOnDestroy(): void {
    if (this.createPermanentTransferAgreement$) {
      this.createPermanentTransferAgreement$.unsubscribe();
    }
  }
  createPermanentTransferAgreements() {
    this.permanentTransferAgreement = new PermanentTransferAgreement();
    this.permanentTransferAgreement.creditor = new Creditor();
    this.permanentTransferAgreement.creditor.iban = this.createOVPForm.value.creditorAccountNumber;
    this.permanentTransferAgreement.creditor.bic = this.createOVPForm.value.creditorBic;
    this.permanentTransferAgreement.creditor.name = this.createOVPForm.value.creditorName;
    this.permanentTransferAgreement.teccCanalId = this.createOVPForm.value.teccCanalId;
    this.permanentTransferAgreement.periodicityId = this.createOVPForm.value.periodicityId;
    this.permanentTransferAgreement.amount = this.createOVPForm.value.amount;
    this.permanentTransferAgreement.customerAccountNumber = this.createOVPForm.value.customerAccountNumber;

    this.permanentTransferAgreement.canalId = 'IN';
    this.permanentTransferAgreement.teccCanalId = 'IN';
    // tslint:disable-next-line: max-line-length
    const date = new Date(
      this.createOVPForm.value.dueDate.year,
      this.createOVPForm.value.dueDate.month - 1,
      this.createOVPForm.value.dueDate.day
    );
    this.permanentTransferAgreement.dueDate = this.datepipe.transform(
      date,
      'yyyyMMdd'
    );
    // tslint:disable-next-line: max-line-length
    this.permanentTransferAgreement.codeDueDate = this.permanentTransferAgreement.dueDate.substring(
      this.permanentTransferAgreement.dueDate.length - 2,
      this.permanentTransferAgreement.dueDate.length
    );
    this.createPermanentTransferAgreement$ = this.permanentTransferAgreementsService
      .createPermanentTransferAgreement(
        serialize(this.permanentTransferAgreement)
      )
      .subscribe(
        OVP => {
          this.permanentTransferAgreement = OVP;
          this.activeModal.close();
          this.createModalCloseEmitter.emit('OK');
        },
        error => {
          const modalRef = this.modalService.open(MessageComponent, {
            size: 'sm'
          });
          modalRef.componentInstance.message = error.error.errorDescription;
        }
      );
  }
}
