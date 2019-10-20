import { Creditor } from './creditor';
import { JsonProperty } from 'json-typescript-mapper';

export class PermanentTransferAgreement {
  @JsonProperty('service_convention_id')
  serviceConventionId?: string;
  @JsonProperty('due_date')
  dueDate?: string;
  @JsonProperty('next_due_date')
  nextDueDate?: string;
  @JsonProperty('code_due_date')
  codeDueDate?: string;
  @JsonProperty('periodicity_id')
  periodicityId?: string;
  @JsonProperty('day_of_week')
  dayOfWeek?: string;
  @JsonProperty('code_permanent_transfer_agreement')
  codePermanentTransferAgreement?: string;
  @JsonProperty('amount')
  amount?: string;
  @JsonProperty('canal_id')
  canalId?: string;
  @JsonProperty('financial_order_reason')
  financialOrderReason?: string;
  @JsonProperty('reduction_customer')
  reductionCustomer?: string;
  @JsonProperty('customer_reference')
  customerReference?: string;
  @JsonProperty('communication_technical_id')
  communicationTechnicalId?: string;
  @JsonProperty('update_date')
  updateDate?: string;
  @JsonProperty('tecc_canal_id')
  teccCanalId?: string;
  @JsonProperty('customer_account_number')
  customerAccountNumber?: string;
  @JsonProperty({clazz: Creditor, name: 'creditor'})
  creditor?: Creditor;
  @JsonProperty('end_due_date')
  endDueDate?: string;
  @JsonProperty('fence_reason')
  fenceReason?: string;

  constructor() {
    this.serviceConventionId = void 0;
    this.dueDate = void 0;
    this.nextDueDate = void 0;
    this.codeDueDate = void 0;
    this.periodicityId = void 0;
    this.dayOfWeek = void 0;
    this.codePermanentTransferAgreement = void 0;
    this.amount = void 0;
    this.canalId = void 0;
    this.financialOrderReason = void 0;
    this.reductionCustomer = void 0;
    this.customerReference = void 0;
    this.communicationTechnicalId = void 0;
    this.updateDate = void 0;
    this.teccCanalId = void 0;
    this.creditor = void 0;
    this.customerAccountNumber = void 0;
    this.endDueDate = void 0;
    this.fenceReason = void 0;
  }

  /**
   * sss
   */
  btoa?(): string {
    return btoa(JSON.stringify(this));
  }

}
