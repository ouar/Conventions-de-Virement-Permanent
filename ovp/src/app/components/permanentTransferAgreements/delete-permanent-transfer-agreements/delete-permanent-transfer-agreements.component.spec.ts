import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePermanentTransferAgreementsComponent } from './delete-permanent-transfer-agreements.component';

describe('DeletePermanentTransferAgreementsComponent', () => {
  let component: DeletePermanentTransferAgreementsComponent;
  let fixture: ComponentFixture<DeletePermanentTransferAgreementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePermanentTransferAgreementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePermanentTransferAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
