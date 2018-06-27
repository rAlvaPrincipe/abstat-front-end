import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySelectorComponent } from './summary-selector.component';

describe('SummarySelectorComponent', () => {
  let component: SummarySelectorComponent;
  let fixture: ComponentFixture<SummarySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
