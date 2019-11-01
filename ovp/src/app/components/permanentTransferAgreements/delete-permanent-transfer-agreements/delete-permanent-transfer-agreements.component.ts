import { MessageComponent } from './../message/message.component';
import { PermanentTransferAgreementsService } from './../../../shared/services/permanent-transfer-agreements.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PermanentTransferAgreement } from 'src/app/shared/models/permanent-transfer-agreement';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-permanent-transfer-agreements',
  templateUrl: './delete-permanent-transfer-agreements.component.html',
  styleUrls: ['./delete-permanent-transfer-agreements.component.css']
})
export class DeletePermanentTransferAgreementsComponent
  implements OnInit, OnDestroy {
  @Input() permanentTransferAgreement: PermanentTransferAgreement;
  @Output() deleteModalCloseEmitter = new EventEmitter<string>();
  private deletePermanentTransferAgreement$: Subscription;
  protected deleteOVPForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private permanentTransferAgreementsService: PermanentTransferAgreementsService
  ) {}

  ngOnInit() {
    this.deleteOVPForm = this.formBuilder.group({
      fenceReason: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    if (this.deletePermanentTransferAgreement$) {
      this.deletePermanentTransferAgreement$.unsubscribe();
    }
  }

  deletePermanentTransferAgreements() {
    this.deletePermanentTransferAgreement$ = this.permanentTransferAgreementsService
      .deletePermanentTransferAgreement(
        this.permanentTransferAgreement.customerAccountNumber,
        this.deleteOVPForm.value.fenceReason,
        this.permanentTransferAgreement.codePermanentTransferAgreement
      )
      .subscribe(
        OVP => {
          this.permanentTransferAgreement = OVP;
          this.activeModal.close();
          this.deleteModalCloseEmitter.emit('OK');
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
