import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupostTipsComponent } from './coupost-tips.component';

describe('CoupostTipsComponent', () => {
  let component: CoupostTipsComponent;
  let fixture: ComponentFixture<CoupostTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoupostTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupostTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
