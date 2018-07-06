import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Summary} from '../summary';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html'
})
export class SearchFormComponent implements OnInit {
  @Output() onSubmit: EventEmitter<SearchRequest>;
  @Input() searching: boolean;
  datasets: Set<string>;
  request: SearchRequest;

  constructor( private http: Http) {
    this.datasets = new Set<string>();
    this.onSubmit = new EventEmitter<SearchRequest>();
    this.request = new SearchRequest();
  }

  ngOnInit() {
    this.getDatasets();
  }

  getDatasets(): void {
    let  data: JSON[];
    this.http.get('http://backend.abstat.disco.unimib.it/api/v1/summaries?indexed=true')
      .subscribe((res: Response) => {
        data = res.json().summaries;
        data.map((el: any) => {
          const summary: Summary = el;
          this.datasets.add(summary.dsName);
        });
      });
  }

  submitted(any: any): void {
    this.onSubmit.emit(this.request);
  }
}


export class SearchRequest {
  dataset: string;
  query: string;
  includeNPref: boolean;
  start: number;
  rows: number;

  constructor() {
    this.dataset = 'all';
    this.query = '';
    this.includeNPref = false;
    this.start = 0;
    this.rows = 20;
  }
}
