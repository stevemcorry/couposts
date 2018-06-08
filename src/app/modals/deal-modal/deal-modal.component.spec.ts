import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealModalComponent } from './deal-modal.component';

describe('DealModalComponent', () => {
  let component: DealModalComponent;
  let fixture: ComponentFixture<DealModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
