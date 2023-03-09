import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsepatientComponent } from './browsepatient.component';

describe('BrowsepatientComponent', () => {
  let component: BrowsepatientComponent;
  let fixture: ComponentFixture<BrowsepatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowsepatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowsepatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
