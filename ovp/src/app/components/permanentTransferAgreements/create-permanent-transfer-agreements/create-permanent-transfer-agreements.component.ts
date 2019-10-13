import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-permanent-transfer-agreements',
  templateUrl: './create-permanent-transfer-agreements.component.html',
  styleUrls: ['./create-permanent-transfer-agreements.component.css']
})
export class CreatePermanentTransferAgreementsComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  backClicked() {
    this.location.back();
  }

}
