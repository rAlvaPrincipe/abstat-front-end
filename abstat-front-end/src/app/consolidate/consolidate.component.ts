import {Component, OnInit} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Summary } from '../summary';

@Component({
  selector: 'app-consolidate',
  templateUrl: './consolidate.component.html',
})
export class ConsolidateComponent implements OnInit {
  summaries: Summary[];
  showTB: boolean;
  consolidate = new ConsolidateRequest();


  constructor(private http: Http) {
    this.summaries = [];
    this.showTB = false;
  }

  ngOnInit() {
    this.getSummaries();
  }

  getSummaries(): void {
    let data: JSON[];
    this.http.get('http://backend.abstat.disco.unimib.it/api/v1/summaries')
      .subscribe((res: Response) => {
        data = res.json().summaries;
        data.map((el: any) => {
          const summary: Summary = el;
          this.summaries.push(summary);
        });
      });
  }

  showTextBox(event): void {
    if(event.target.value === 'Custom')
      this.showTB = true;
    else
      this.showTB = false;
  }

  onFormSubmit(any:any): void {
    const data = 'summary=' + this.consolidate.summary + '&store=' + this.consolidate.stored + '&index=' + this.consolidate.indexed + '&domain=' + this.consolidate.domain;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    this.http.post('http://backend.abstat.disco.unimib.it/consolidate', data,  options).subscribe(res => console.log(res.json()));
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
