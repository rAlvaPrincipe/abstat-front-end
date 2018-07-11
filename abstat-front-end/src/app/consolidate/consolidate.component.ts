import {Component, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Summary } from '../summary';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-consolidate',
  templateUrl: './consolidate.component.html',
})
export class ConsolidateComponent implements OnInit {
  summaries: Summary[];
  showTB: boolean;
  consolidate = new ConsolidateRequest();
  consolidating: boolean;


  constructor(private http: Http, private apiService: ApiService, private router: Router) {
    this.summaries = [];
    this.showTB = false;
    this.consolidating = false;
  }

  ngOnInit() {
    this.summaries = this.apiService.getSummaries(null, null);
  }

  showTextBox(event): void {
    if(event.target.value === 'Custom')
      this.showTB = true;
    else
      this.showTB = false;
  }

  onFormSubmit(): void {
    this.consolidating = true;
    const data = 'summary=' + this.consolidate.summary + '&store=' + this.consolidate.stored + '&index=' + this.consolidate.indexed + '&domain=' + this.consolidate.domain;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    this.http.post('http://backend.abstat.disco.unimib.it/consolidate', data,  options).subscribe(res => {
      location.reload();
    });
  }

}

export class ConsolidateRequest {

  public summary: string;
  public stored: boolean;
  public indexed: boolean;
  public domain: String;

  constructor() {
    this.stored = false;
    this.indexed = false;
  }
}
