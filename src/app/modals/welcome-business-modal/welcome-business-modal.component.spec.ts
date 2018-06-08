import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeBusinessModalComponent } from './welcome-business-modal.component';

describe('WelcomeBusinessModalComponent', () => {
  let component: WelcomeBusinessModalComponent;
  let fixture: ComponentFixture<WelcomeBusinessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeBusinessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeBusinessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
