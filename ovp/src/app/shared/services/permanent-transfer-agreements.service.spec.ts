import { TestBed } from '@angular/core/testing';

import { PermanentTransferAgreementsService } from './permanent-transfer-agreements.service';

describe('PermanentTransferAgreementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermanentTransferAgreementsService = TestBed.get(PermanentTransferAgreementsService);
    expect(service).toBeTruthy();
  });
});
