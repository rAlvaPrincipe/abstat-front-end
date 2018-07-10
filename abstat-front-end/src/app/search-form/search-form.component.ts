import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {Http} from '@angular/http';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html'
})
export class SearchFormComponent implements OnInit {
  @Output() onSubmit: EventEmitter<SearchRequest>;
  @Input() searching: boolean;
  datasets: Set<string>;
  request: SearchRequest;

  constructor( private http: Http, private apiService: ApiService) {
    this.datasets = new Set<string>();
    this.onSubmit = new EventEmitter<SearchRequest>();
    this.request = new SearchRequest();
  }

  ngOnInit() {
    this.datasets = this.apiService.getDatasetsWhichSummariesAreIndexed();
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
