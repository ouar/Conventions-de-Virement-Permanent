import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { PermanentTransferAgreement } from 'src/app/shared/models/permanent-transfer-agreement';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermanentTransferAgreementsService } from 'src/app/shared/services/permanent-transfer-agreements.service';
import { PERIODICITIES } from 'src/app/shared/models/list-periodicity';
import { Creditor } from 'src/app/shared/models/creditor';
import { serialize } from 'json-typescript-mapper';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-edit-permanent-transfer-agreements',
  templateUrl: './edit-permanent-transfer-agreements.component.html',
  styleUrls: ['./edit-permanent-transfer-agreements.component.css']
})
export class EditPermanentTransferAgreementsComponent
  implements OnInit, OnDestroy {
  @Input() permanentTransferAgreement: PermanentTransferAgreement;
  @Output() editModalCloseEmitter = new EventEmitter<string>();
  private newPermanentTransferAgreement: PermanentTransferAgreement;
  private updatePermanentTransferAgreement$: Subscription;
  protected periodicities;
  protected updateOVPForm: FormGroup;

  constructor(
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private permanentTransferAgreementsService: PermanentTransferAgreementsService
  ) {}

  ngOnInit() {
    this.periodicities = PERIODICITIES;
    this.updateOVPForm = this.formBuilder.group({
      customerAccountNumber: [
        this.permanentTransferAgreement.customerAccountNumber,
        Validators.required
      ],
      amount: [this.permanentTransferAgreement.amount, Validators.required],
      creditorAccountNumber: [
        this.permanentTransferAgreement.creditor.iban,
        Validators.required
      ],
      creditorBic: [
        this.permanentTransferAgreement.creditor.bic,
        Validators.required
      ],
      creditorName: [
        this.permanentTransferAgreement.creditor.name,
        Validators.required
      ],
      nextDueDate: [
        this.getDate(this.permanentTransferAgreement.nextDueDate),
        Validators.required
      ],
      endDueDate: [this.getDate(this.permanentTransferAgreement.endDueDate)],
      periodicityId: [
        this.pad(this.permanentTransferAgreement.periodicityId, 2),
        Validators.required
      ],
      teccCanalId: [this.permanentTransferAgreement.teccCanalId]
    });

    this.onChanges();
  }
  ngOnDestroy(): void {
    if (this.updatePermanentTransferAgreement$) {
      this.updatePermanentTransferAgreement$.unsubscribe();
    }
  }

  updatePermanentTransferAgreement() {
    this.newPermanentTransferAgreement.canalId = 'IN';
    this.newPermanentTransferAgreement.codePermanentTransferAgreement = this.permanentTransferAgreement.codePermanentTransferAgreement;
    this.newPermanentTransferAgreement.serviceConventionId = this.permanentTransferAgreement.serviceConventionId;
    if (!this.newPermanentTransferAgreement.periodicityId) {
      this.newPermanentTransferAgreement.periodicityId = this.permanentTransferAgreement.periodicityId;
    }
    if (!this.newPermanentTransferAgreement.nextDueDate) {
      // tslint:disable-next-line: max-line-length
      this.newPermanentTransferAgreement.nextDueDate = this.datepipe.transform(
        this.parseDate(this.permanentTransferAgreement.nextDueDate),
        'yyyyMMdd'
      );
    }
    if (!this.newPermanentTransferAgreement.endDueDate) {
      // tslint:disable-next-line: max-line-length
      this.newPermanentTransferAgreement.endDueDate = this.datepipe.transform(
        this.parseDate(this.permanentTransferAgreement.endDueDate),
        'yyyyMMdd'
      );
    }
    // tslint:disable-next-line: max-line-length
    this.newPermanentTransferAgreement.dueDate = this.datepipe.transform(
      this.parseDate(this.permanentTransferAgreement.dueDate),
      'yyyyMMdd'
    );
    this.newPermanentTransferAgreement.codeDueDate = this.permanentTransferAgreement.codeDueDate;
    this.updatePermanentTransferAgreement$ = this.permanentTransferAgreementsService
      .updatePermanentTransferAgreement(
        serialize(this.newPermanentTransferAgreement)
      )
      .subscribe(
        OVP => {
          this.newPermanentTransferAgreement = OVP;
          this.activeModal.close();
          this.editModalCloseEmitter.emit('OK');
        },
        error => {
          const modalRef = this.modalService.open(MessageComponent, {
            size: 'sm'
          });
          modalRef.componentInstance.message = error.error.errorDescription;
        }
      );
  }

  onChanges(): void {
    this.newPermanentTransferAgreement = new PermanentTransferAgreement();
    this.newPermanentTransferAgreement.creditor = new Creditor();
    this.updateOVPForm.controls.customerAccountNumber.valueChanges.subscribe(
      newCustomerAccountNumber => {
        this.newPermanentTransferAgreement.customerAccountNumber = newCustomerAccountNumber;
      }
    );
    this.updateOVPForm.controls.amount.valueChanges.subscribe(newAmount => {
      this.newPermanentTransferAgreement.amount = newAmount;
    });
    this.updateOVPForm.controls.creditorAccountNumber.valueChanges.subscribe(
      newCreditorAccountNumber => {
        this.newPermanentTransferAgreement.creditor.name = newCreditorAccountNumber;
      }
    );
    this.updateOVPForm.controls.creditorBic.valueChanges.subscribe(
      newCreditorBic => {
        this.newPermanentTransferAgreement.creditor.bic = newCreditorBic;
      }
    );
    this.updateOVPForm.controls.creditorName.valueChanges.subscribe(
      newCreditorName => {
        this.newPermanentTransferAgreement.creditor.name = newCreditorName;
      }
    );
    this.updateOVPForm.controls.nextDueDate.valueChanges.subscribe(
      newNextDueDate => {
        if (typeof newNextDueDate === 'string') {
          this.newPermanentTransferAgreement.nextDueDate = this.datepipe.transform(
            newNextDueDate,
            'yyyyMMdd'
          );
        } else {
          // tslint:disable-next-line: max-line-length
          const date = new Date(
            newNextDueDate.year,
            newNextDueDate.month - 1,
            newNextDueDate.day
          );
          this.newPermanentTransferAgreement.nextDueDate = this.datepipe.transform(
            date,
            'yyyyMMdd'
          );
        }
      }
    );
    this.updateOVPForm.controls.endDueDate.valueChanges.subscribe(
      newEndDueDate => {
        if (typeof newEndDueDate === 'string') {
          this.newPermanentTransferAgreement.endDueDate = this.datepipe.transform(
            newEndDueDate,
            'yyyyMMdd'
          );
        } else {
          // tslint:disable-next-line: max-line-length
          const date = new Date(
            newEndDueDate.year,
            newEndDueDate.month - 1,
            newEndDueDate.day
          );
          this.newPermanentTransferAgreement.endDueDate = this.datepipe.transform(
            date,
            'yyyyMMdd'
          );
        }
      }
    );
    this.updateOVPForm.controls.periodicityId.valueChanges.subscribe(
      newPeriodicityId => {
        this.newPermanentTransferAgreement.periodicityId = newPeriodicityId;
      }
    );
    this.updateOVPForm.controls.teccCanalId.valueChanges.subscribe(
      newTeccCanalId => {
        this.newPermanentTransferAgreement.teccCanalId = newTeccCanalId;
      }
    );
  }

  pad(num: string, size: number): string {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }
  parseDate(dateString: string): object {
    if (dateString) {
      const dateParts: string[] = dateString.split('/');
      // month is 0-based, that's why we need dataParts[1] - 1
      return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    } else {
      return null;
    }
  }

  getDate(dateString: string): object {
    if (dateString) {
      const dateParts: string[] = dateString.split('/');
      // month is 0-based, that's why we need dataParts[1] - 1
      return { year: +dateParts[2], month: +dateParts[1], day: +dateParts[0] };
    } else {
      return null;
    }
  }
}
