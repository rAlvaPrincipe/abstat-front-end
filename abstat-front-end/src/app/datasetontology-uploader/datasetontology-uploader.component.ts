import {Component, Input} from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-datasetontology-uploader',
  templateUrl: './datasetontology-uploader.component.html'
})
export class DatasetontologyUploaderComponent {
  file: File;
  status: string;
  @Input() mode: string;

  constructor(private apiService: ApiService) {
    this.status = 'waiting';
  }

  selectFile(files: any) {
    this.file = files[0];
  }

  upload(): void {
    this.status = 'loading';
    this.apiService.upload(this.file, this.mode)
      .subscribe(response => {
          this.status = 'loaded';},
        (err) => {
          this.status = 'loaded';
        });
  }
}
