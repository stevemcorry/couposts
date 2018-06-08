import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessWebsiteModalComponent } from './business-website-modal.component';

describe('BusinessWebsiteModalComponent', () => {
  let component: BusinessWebsiteModalComponent;
  let fixture: ComponentFixture<BusinessWebsiteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessWebsiteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessWebsiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
