import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDealsComponent } from './edit-deals.component';

describe('EditDealsComponent', () => {
  let component: EditDealsComponent;
  let fixture: ComponentFixture<EditDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
