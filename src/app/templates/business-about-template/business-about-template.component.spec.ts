import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAboutTemplateComponent } from './business-about-template.component';

describe('BusinessAboutTemplateComponent', () => {
  let component: BusinessAboutTemplateComponent;
  let fixture: ComponentFixture<BusinessAboutTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAboutTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAboutTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
