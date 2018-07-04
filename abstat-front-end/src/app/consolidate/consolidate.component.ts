import {Component, OnInit, DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Summary } from '../summary';
import { ConsilidateRequest} from '../consilidate-request';

@Component({
  selector: 'app-consolidate',
  templateUrl: './consolidate.component.html',
})
export class ConsolidateComponent implements OnInit {
  summaries: Summary[];
  showTB: boolean;
  consolidate = new ConsilidateRequest();


  constructor(private http: Http) {
    this.summaries = [];
    this.showTB = false;
  }

  ngOnInit() {
    this.getSummaries();
  }


  getSummaries(): void {
    let data: JSON[];
    this.http.get('http://localhost/api/v1/summaries')
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
    console.log(this.consolidate.summary);
    console.log(this.consolidate.stored);
    console.log(this.consolidate.indexed);
    console.log(this.consolidate.domain);

    const data = 'summary=' + this.consolidate.summary + '&store=' + this.consolidate.stored + '&index=' + this.consolidate.indexed + '&domain=' + this.consolidate.domain;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    this.http.post('http://localhost/consolidate', data,  options).subscribe(res => console.log(res.json()));
  }

}
