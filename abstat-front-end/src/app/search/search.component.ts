import { Component, OnInit } from '@angular/core';
import {SearchResult} from '../search-result';
import {Http, Response} from '@angular/http';
import {PrefixService} from '../prefix.service';
import {SearchRequest} from '../search-form/search-form.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  results: SearchResult[];
  request: SearchRequest;
  show: boolean;
  searching: boolean;

  constructor(private http: Http, private prefixService: PrefixService) {
    this.results = [];
    this.request = new SearchRequest();
    this.show = false;
    this.searching = false;
  }

  search(): void {
    let url = 'http://backend.abstat.disco.unimib.it/api/v1/search?q=' + this.request.query + '&rows=' + this.request.rows + '&start=' + this.request.start + '&includeNPref=' + this.request.includeNPref;
    if (this.request.dataset !== 'all') {
      url +=  '&dataset=' + this.request.dataset;
    }

    let  data: JSON[];
    this.http.get(url)
      .subscribe((res: Response) => {
        data = res.json().results;
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
