import { JsonProperty } from 'json-typescript-mapper';
export class Creditor {
  @JsonProperty('name')
  name?: string;
  @JsonProperty('iban')
  iban?: string;   ////////////////////////
  @JsonProperty('bic')
  bic?: string;
  @JsonProperty('account_number')
  accountNumber?: string;   ////////////////////////

  constructor() {
    this.accountNumber = void 0;
    this.bic = void 0;
    this.iban = void 0;
    this.name = void 0;
  }
}
