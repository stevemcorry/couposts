import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUploadModalComponent } from './business-upload-modal.component';

describe('BusinessUploadModalComponent', () => {
  let component: BusinessUploadModalComponent;
  let fixture: ComponentFixture<BusinessUploadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessUploadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
