import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizeRecapComponent } from './summarize-recap.component';

describe('SummarizeRecapComponent', () => {
  let component: SummarizeRecapComponent;
  let fixture: ComponentFixture<SummarizeRecapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarizeRecapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizeRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
