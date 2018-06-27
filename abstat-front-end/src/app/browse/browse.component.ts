import {Component, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Akp} from '../akp';
import { Summary} from '../summary';
import {BrowseAutocompleteComponent} from '../browse-autocomplete/browse-autocomplete.component';
import {PrefixService} from '../prefix.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  providers:  [ PrefixService ]
})
export class BrowseComponent {
  patterns: Akp[];
  current_summary: Summary;
  limit: number;
  offset: number;
  subjConstraint: string;
  predConstraint: string;
  objConstraint: string;
  show: boolean;
  loadingPatterns: boolean;
  @ViewChild('subjAutocomplete') subjectRef: BrowseAutocompleteComponent;
  @ViewChild('predAutocomplete') predicateRef: BrowseAutocompleteComponent;
  @ViewChild('objAutocomplete') objectRef: BrowseAutocompleteComponent;

  constructor(private http: Http, private prefixService: PrefixService) {
    this.patterns = [];
    this.current_summary = null;
    this.limit = 20;
    this.offset = 0;
    this.show = false;
    this.loadingPatterns = false;
    this.subjConstraint = '';
    this.predConstraint = '';
    this.objConstraint = '';
  }

  getSummary(summary: Summary): void {
    this.current_summary = summary;
    this.offset = 0;
    this.show = false;
    this.patterns = [];
    this.subjConstraint = '';
    this.predConstraint = '';
    this.objConstraint = '';
    this.search();
  }

  filter() {
    this.subjConstraint = this.getExtendedURI(this.subjectRef.constraint);
    this.predConstraint = this.getExtendedURI(this.predicateRef.constraint);
    this.objConstraint = this.getExtendedURI(this.objectRef.constraint);
    this.loadingPatterns = true;

    this.offset = 0;
    this.patterns = [];
    this.search();
  }

  loadMore() {
    this.offset += 20;
    this.loadingPatterns = true;
    this.search();
  }

  search(): void {
    let data: JSON[];
    this.http.get('http://backend.abstat.disco.unimib.it/api/v1/browse?enrichWithSPO=true&summary=' + this.current_summary.id + '&subj=' + encodeURIComponent(this.subjConstraint) + '&pred=' + encodeURIComponent(this.predConstraint) + '&obj=' + encodeURIComponent(this.objConstraint) + '&limit=' + this.limit + '&offset=' + this.offset)
      .subscribe((res: Response) => {
        data = res.json().akps;
        data.map((el: any) => {
          const pattern: Akp = el;
          this.patterns.push(pattern);
        });
        this.show = true;
        this.loadingPatterns = false;
      });
  }

  getExtendedURI(input: string): string {
    return this.prefixService.getExtendedURI(input);
  }

  prefix(uri: string): string {
    return this.prefixService.prefix(uri);
  }

  isInternal(pattern: Akp): string {
    if (pattern.subType.indexOf('external') > -1)
      return '';
    return 'star-o';
  }

}

