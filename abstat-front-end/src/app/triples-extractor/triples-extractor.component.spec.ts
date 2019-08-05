import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriplesExtractorComponent } from './triples-extractor.component';

describe('TriplesExtractorComponent', () => {
  let component: TriplesExtractorComponent;
  let fixture: ComponentFixture<TriplesExtractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriplesExtractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriplesExtractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
