import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyInstaModalComponent } from './verify-insta-modal.component';

describe('VerifyInstaModalComponent', () => {
  let component: VerifyInstaModalComponent;
  let fixture: ComponentFixture<VerifyInstaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyInstaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyInstaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
