import {Component, Input} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-datasetontology-uploader',
  templateUrl: './datasetontology-uploader.component.html'
})
export class DatasetontologyUploaderComponent {
  file: File;
  status: string;
  @Input() mode: string;
  @Input() cluster: boolean;

  constructor(private apiService: ApiService) {
    this.status = 'waiting';
    this.cluster = false;
  }

  selectFile(files: any) {
    this.file = files[0];
  }

  upload(): void {
    this.status = 'loading';
    this.apiService.upload(this.cluster, this.file, this.mode)
      .subscribe(response => {
          this.status = 'loaded';},
        (err) => {
          this.status = 'loaded';
        });
  }
}
