import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLocationsModalComponent } from './business-locations-modal.component';

describe('BusinessLocationsModalComponent', () => {
  let component: BusinessLocationsModalComponent;
  let fixture: ComponentFixture<BusinessLocationsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessLocationsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessLocationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
