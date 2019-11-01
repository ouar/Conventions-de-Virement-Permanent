import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPermanentTransferAgreementsComponent } from './list-permanent-transfer-agreements.component';

describe('ListPermanentTransferAgreementsComponent', () => {
  let component: ListPermanentTransferAgreementsComponent;
  let fixture: ComponentFixture<ListPermanentTransferAgreementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListPermanentTransferAgreementsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPermanentTransferAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
