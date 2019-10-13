import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermanentTransferAgreementsComponent } from './edit-permanent-transfer-agreements.component';

describe('EditPermanentTransferAgreementsComponent', () => {
  let component: EditPermanentTransferAgreementsComponent;
  let fixture: ComponentFixture<EditPermanentTransferAgreementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPermanentTransferAgreementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPermanentTransferAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
