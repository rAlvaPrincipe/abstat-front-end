import {Component, OnChanges, Input, SimpleChanges} from '@angular/core';
import { Summary} from '../summary';
import {PrefixService} from '../prefix.service';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-browse-autocomplete',
  templateUrl: './browse-autocomplete.component.html',
  providers:  [ PrefixService ]
})
export class BrowseAutocompleteComponent implements OnChanges  {

  @Input() type: string;
  @Input() summary: Summary;
  query = '';
  results: string[] = [];
  constraint: string = '';

  constructor(private prefixService: PrefixService, private apiService: ApiService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['summary']) {
      this.obtainSuggestions();
    }
  }

  obtainSuggestions(): void {
    this.results = [];
    let data: JSON[];

    this.apiService.suggest(this.summary, this.type)
      .subscribe((response) => {
        data = response['results'];
        data.map((el: any) => {
          const result: string = this.prefix(el.result);
          this.results.push(result);
        });
      });
  }

  prefix(uri: string): string {
    return this.prefixService.prefix(uri);
  }
}
