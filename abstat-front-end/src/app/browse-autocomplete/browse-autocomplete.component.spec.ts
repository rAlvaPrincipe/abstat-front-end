import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseAutocompleteComponent } from './browse-autocomplete.component';

describe('BrowseAutocompleteComponent', () => {
  let component: BrowseAutocompleteComponent;
  let fixture: ComponentFixture<BrowseAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
