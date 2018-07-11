import {Component, Input} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-datasetontology-uploader',
  templateUrl: './datasetontology-uploader.component.html'
})
export class DatasetontologyUploaderComponent {
  file: File;
  status: string;
  @Input() mode: string;

  constructor(private http: Http) {
    this.status = 'waiting';
  }


  selectFile(files: any) {
    this.file = files[0];
  }

  upload(): void {
    this.status = 'loading';
    const headers = new Headers();
    const options = new RequestOptions({ headers: headers });
    const formData = new FormData();
    formData.append('file', this.file);

    let url = '';
    if (this.mode === 'dataset'){
      url = 'http://backend.abstat.disco.unimib.it/upload/ds';
    } else {
      url = 'http://backend.abstat.disco.unimib.it/upload/ont';
    }

    const req = this.http.post(url, formData, options);
    req.subscribe( data => {
      console.log('done');
      this.status = 'loaded';
    });
  }


/*
  upload2() {
    const req = new HttpRequest('POST', 'http://backend.abstat.disco.unimib.it/upload/ds', this.file, {
      reportProgress: true,
    });
    this.http2.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        console.log(`File is ${percentDone}% uploaded.`);
      }
      else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    }, error => {console.log('errore'); });
  }
*/
}
