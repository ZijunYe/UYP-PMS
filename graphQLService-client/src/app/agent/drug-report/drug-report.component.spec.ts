import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugReportComponent } from './drug-report.component';

describe('DrugReportComponent', () => {
  let component: DrugReportComponent;
  let fixture: ComponentFixture<DrugReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
