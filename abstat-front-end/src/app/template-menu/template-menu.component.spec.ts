import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMenuComponent } from './template-menu.component';

describe('TemplateMenuComponent', () => {
  let component: TemplateMenuComponent;
  let fixture: ComponentFixture<TemplateMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
