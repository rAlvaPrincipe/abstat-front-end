import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetontologyUploaderComponent } from './datasetontology-uploader.component';

describe('DatasetontologyUploaderComponent', () => {
  let component: DatasetontologyUploaderComponent;
  let fixture: ComponentFixture<DatasetontologyUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetontologyUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetontologyUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
