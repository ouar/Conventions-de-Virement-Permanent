import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PermanentTransferAgreement } from 'src/app/shared/models/permanent-transfer-agreement';

@Component({
  selector: 'app-edit-permanent-transfer-agreements',
  templateUrl: './edit-permanent-transfer-agreements.component.html',
  styleUrls: ['./edit-permanent-transfer-agreements.component.css']
})
export class EditPermanentTransferAgreementsComponent
  implements OnInit, OnDestroy {
  permanentTransferAgreement: PermanentTransferAgreement;
  sub: Subscription;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.permanentTransferAgreement = JSON.parse(atob(params.permanentTransferAgreement));
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  backClicked() {
    this.location.back();
  }
}
