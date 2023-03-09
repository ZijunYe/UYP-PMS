import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPrescriptionsComponent } from './verify-prescriptions.component';

describe('VerifyPrescriptionsComponent', () => {
  let component: VerifyPrescriptionsComponent;
  let fixture: ComponentFixture<VerifyPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyPrescriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
