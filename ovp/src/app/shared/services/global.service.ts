import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public ListPermanentTransferAgreements: FormGroup;
  constructor() {}
}
