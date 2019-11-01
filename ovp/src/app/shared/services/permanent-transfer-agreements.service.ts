import { PermanentTransferAgreement } from 'src/app/shared/models/permanent-transfer-agreement';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchCriteria } from '../models/search-criteria';

@Injectable({
  providedIn: 'root'
})
export class PermanentTransferAgreementsService {
  private listOVP: BehaviorSubject<
    PermanentTransferAgreement[]
  > = new BehaviorSubject([]);
  Array = this.listOVP.asObservable();

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  findPermanentTransferAgreements(
    searchCriteria: SearchCriteria
  ): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('idCR', '87800');
    // tslint:disable-next-line: align
    return this.http.get(this.baseUrl, {
      params: {
        regional_bank_id: '87800',
        account_number: searchCriteria.accountNumber,
        amount_min: searchCriteria.amountMin,
        amount_max: searchCriteria.amountMax
      },
      headers
    });
  }
  createPermanentTransferAgreement(
    permanentTransferAgreement: PermanentTransferAgreement
  ): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('idCR', '87800');
    // tslint:disable-next-line: align
    return this.http.post(this.baseUrl, permanentTransferAgreement, {
      params: {
        regional_bank_id: '87800'
      },
      headers
    });
  }
  updatePermanentTransferAgreement(
    permanentTransferAgreement: PermanentTransferAgreement
  ): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('idCR', '87800');
    // tslint:disable-next-line: align
    return this.http.put(this.baseUrl, permanentTransferAgreement, {
      params: {
        regional_bank_id: '87800'
      },
      headers
    });
  }
  deletePermanentTransferAgreement(
    accountNumber: string,
    fenceReason: string,
    idOvp: string
  ): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('idCR', '87800');
    // tslint:disable-next-line: align
    return this.http.delete(this.baseUrl + '/' + idOvp, {
      params: {
        regional_bank_id: '87800',
        debtor_account_number: accountNumber,
        fence_reason: fenceReason
      },
      headers
    });
  }
  initListOVP(listOVP: Array<PermanentTransferAgreement>) {
    this.listOVP.next(listOVP);
  }
  clearListOVP() {
    this.listOVP.next(null);
  }
}
