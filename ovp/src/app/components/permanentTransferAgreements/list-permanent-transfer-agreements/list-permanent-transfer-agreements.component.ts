// tslint:disable-next-line: max-line-length
import { CreatePermanentTransferAgreementsComponent } from './../create-permanent-transfer-agreements/create-permanent-transfer-agreements.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from './../message/message.component';
import { Subscription } from 'rxjs';
import { deserialize } from 'json-typescript-mapper';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermanentTransferAgreementsService } from '../../../shared/services/permanent-transfer-agreements.service';
import { PermanentTransferAgreement } from 'src/app/shared/models/permanent-transfer-agreement';
// tslint:disable-next-line: max-line-length
import { DeletePermanentTransferAgreementsComponent } from '../delete-permanent-transfer-agreements/delete-permanent-transfer-agreements.component';
// tslint:disable-next-line: max-line-length
import { EditPermanentTransferAgreementsComponent } from '../edit-permanent-transfer-agreements/edit-permanent-transfer-agreements.component';

@Component({
  selector: 'app-list-permanent-transfer-agreements',
  templateUrl: './list-permanent-transfer-agreements.component.html',
  styleUrls: ['./list-permanent-transfer-agreements.component.css']
})
export class ListPermanentTransferAgreementsComponent
  implements OnInit, OnDestroy {
  private findPermanentTransferAgreements$: Subscription;
  private listPermanentTransferAgreements$: Subscription;
  private clodeModalDelete$: Subscription;
  private clodeModalCreate$: Subscription;
  private clodeModalEdit$: Subscription;

  protected permanentTransferAgreementForm: FormGroup;
  protected listPermanentTransferAgreements: Array<
    PermanentTransferAgreement
  > = [];

  constructor(
    private permanentTransferAgreementsService: PermanentTransferAgreementsService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.permanentTransferAgreementForm = this.formBuilder.group({
      accountNumber: ['', Validators.required],
      amountMin: ['0.0', Validators.required],
      amountMax: ['999999999.999', Validators.required]
    });

    this.listPermanentTransferAgreements$ = this.permanentTransferAgreementsService.Array.subscribe(
      state => {
        this.listPermanentTransferAgreements = state;
      }
    );
  }
  findPermanentTransferAgreements() {
    this.findPermanentTransferAgreements$ = this.permanentTransferAgreementsService
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
          const modalRef = this.modalService.open(MessageComponent, {
            size: 'sm'
          });
          modalRef.componentInstance.message = error.error.errorDescription;
        }
      );
  }
  ngOnDestroy(): void {
    if (this.listPermanentTransferAgreements$) {
      this.listPermanentTransferAgreements$.unsubscribe();
    }
    if (this.findPermanentTransferAgreements$) {
      this.findPermanentTransferAgreements$.unsubscribe();
    }
    if (this.clodeModalDelete$) {
      this.clodeModalDelete$.unsubscribe();
    }
    if (this.clodeModalCreate$) {
      this.clodeModalCreate$.unsubscribe();
    }
    if (this.clodeModalEdit$) {
      this.clodeModalEdit$.unsubscribe();
    }
  }

  createPermanentTransferAgreement() {
    const modalRef = this.modalService.open(
      CreatePermanentTransferAgreementsComponent,
      { size: 'lg' }
    );
    this.clodeModalCreate$ = modalRef.componentInstance.createModalCloseEmitter.subscribe(
      () => {
        this.findPermanentTransferAgreements();
      }
    );
  }

  deletePermanentTransferAgreement(
    permanentTransferAgreement: PermanentTransferAgreement
  ) {
    const modalRef = this.modalService.open(
      DeletePermanentTransferAgreementsComponent,
      { size: 'lg' }
    );
    modalRef.componentInstance.permanentTransferAgreement = permanentTransferAgreement;

    this.clodeModalDelete$ = modalRef.componentInstance.deleteModalCloseEmitter.subscribe(
      () => {
        this.findPermanentTransferAgreements();
      }
    );
  }

  editPermanentTransferAgreement(
    permanentTransferAgreement: PermanentTransferAgreement
  ) {
    const modalRef = this.modalService.open(
      EditPermanentTransferAgreementsComponent,
      { size: 'lg' }
    );
    modalRef.componentInstance.permanentTransferAgreement = permanentTransferAgreement;

    this.clodeModalEdit$ = modalRef.componentInstance.editModalCloseEmitter.subscribe(
      () => {
        this.findPermanentTransferAgreements();
      }
    );
  }
}
