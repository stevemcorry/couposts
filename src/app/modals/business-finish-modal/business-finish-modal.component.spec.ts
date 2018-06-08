import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessFinishModalComponent } from './business-finish-modal.component';

describe('BusinessFinishModalComponent', () => {
  let component: BusinessFinishModalComponent;
  let fixture: ComponentFixture<BusinessFinishModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessFinishModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessFinishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
