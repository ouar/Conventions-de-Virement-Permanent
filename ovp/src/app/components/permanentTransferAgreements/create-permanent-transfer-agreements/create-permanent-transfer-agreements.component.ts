import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PERIODICITIES } from '../../../shared/models/list-periodicity';
@Component({
  selector: 'app-create-permanent-transfer-agreements',
  templateUrl: './create-permanent-transfer-agreements.component.html',
  styleUrls: ['./create-permanent-transfer-agreements.component.css']
})
export class CreatePermanentTransferAgreementsComponent implements OnInit {

  periodicities;

  constructor(private location: Location) { }

  ngOnInit() {
    this.periodicities = PERIODICITIES;
  }
  backClicked() {
    this.location.back();
  }

}
