import { Component } from '@angular/core';
import {SearchResult} from '../search-result';
import {PrefixService} from '../prefix.service';
import {SearchRequest} from '../search-form/search-form.component';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  results: SearchResult[];
  request: SearchRequest;
  show: boolean;
  searching: boolean;

  constructor( private prefixService: PrefixService, private apiService: ApiService) {
    this.results = [];
    this.request = new SearchRequest();
    this.show = false;
    this.searching = false;
  }

  search(): void {
    let  data: JSON[];
    this.apiService.search(this.request)
      .subscribe((response) => {
        data = response['results'];
        data.map((el: any) => {
          const result: SearchResult = el;
          this.results.push(result);
        });

        this.show = true;
        this.searching = false;
      });
  }

  serveRequest(request: SearchRequest): void {
    this.request = request;
    this.request.start = 0;
    this.results = [];

    this.searching = true;
    this.show = false;
    this.search();
  }

  loadMore(): void {
    this.request.start += 20;
    this.search();
  }

  prefix(uri: string): string {
    return this.prefixService.prefix(uri);
  }

  aslabel(result: SearchResult): string {
    if (result.type === 'concept' || result.type === 'datatype') { return 'success'; }
    if (result.type.indexOf('Property') > -1) { return 'danger'; }
    if (result.type.indexOf('Akp')) { return 'warning'; }
  }
}
