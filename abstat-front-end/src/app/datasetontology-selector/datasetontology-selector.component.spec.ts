import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetontologySelectorComponent } from './datasetontology-selector.component';

describe('DatasetontologySelectorComponent', () => {
  let component: DatasetontologySelectorComponent;
  let fixture: ComponentFixture<DatasetontologySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetontologySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetontologySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
