import {Component, OnChanges, Input, SimpleChanges} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Summary} from '../summary';
import {PrefixService} from '../prefix.service';

@Component({
  selector: 'app-browse-autocomplete',
  templateUrl: './browse-autocomplete.component.html',
  styleUrls: ['./browse-autocomplete.component.css'],
  providers:  [ PrefixService ]
})
export class BrowseAutocompleteComponent implements OnChanges  {

  @Input() type: string;
  @Input() summary: Summary;
  query = '';
  results: string[] = [];
  constraint: string = '';

  constructor(private http: Http, private  prefixService: PrefixService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['summary']) {
      this.obtainSuggestions();
    }
  }


  obtainSuggestions(): void {
    this.results = [];
    let data: JSON[];

    if (this.type === 'subject') {
      this.http.get('http://backend.abstat.disco.unimib.it/api/v1/SPO?position=subject&summary=' + this.summary.id)
        .subscribe((res: Response) => {
          data = res.json().results;
          data.map((el: any) => {
            const result: string = this.prefix(el.subject);
            this.results.push(result);
          });
        });
    }
    else if (this.type === 'predicate') {
      this.http.get('http://backend.abstat.disco.unimib.it/api/v1/SPO?position=predicate&summary=' + this.summary.id)
        .subscribe((res: Response) => {
          data = res.json().results;
          data.map((el: any) => {
            const result: string = this.prefix(el.predicate);
            this.results.push(result);
          });
        });
    }
    else {
      this.http.get('http://backend.abstat.disco.unimib.it/api/v1/SPO?position=object&summary=' + this.summary.id)
        .subscribe((res: Response) => {
          data = res.json().results;
          data.map((el: any) => {
            const result: string = this.prefix(el.object);
            this.results.push(result);
          });
        });
    }

  }

  prefix(uri: string): string {
    return this.prefixService.prefix(uri);
  }
}
