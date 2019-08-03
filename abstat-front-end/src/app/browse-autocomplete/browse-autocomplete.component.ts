import {Component, OnChanges, Input, SimpleChanges} from '@angular/core';
import { Summary} from '../summary';
import {PrefixService} from '../prefix.service';
import {ApiService} from '../api.service';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-browse-autocomplete',
  templateUrl: './browse-autocomplete.component.html',
  styleUrls: ['./browse-autocomplete.component.css'],
  providers:  [ PrefixService ]
})
export class BrowseAutocompleteComponent implements OnChanges  {

  @Input() type: string;
  @Input() summary: Summary;
  protected dataService: CompleterData;
  query = '';
  results: string[] = [];
  constraint = '';

  constructor(private prefixService: PrefixService, private apiService: ApiService, private completerService: CompleterService) {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['summary']) {
      this.obtainSuggestions();
      this.dataService = this.completerService.local(this.results);
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
