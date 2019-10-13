import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePermanentTransferAgreementsComponent } from './create-permanent-transfer-agreements.component';

describe('CreatePermanentTransferAgreementsComponent', () => {
  let component: CreatePermanentTransferAgreementsComponent;
  let fixture: ComponentFixture<CreatePermanentTransferAgreementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePermanentTransferAgreementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePermanentTransferAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
