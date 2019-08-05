import {Component, OnInit} from '@angular/core';
import {ExtractorRequest} from '../match-selector/match-selector.component';
import {Triple} from '../triple';
import {ApiService} from '../api.service';
import {PrefixService} from '../prefix.service';
import {Akp} from '../akp';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-triples-extractor',
  templateUrl: './triples-extractor.component.html'
})
export class TriplesExtractorComponent  implements OnInit{
  triples: Triple[];
  loadingTriples: boolean;
  request: ExtractorRequest;
  show: boolean;
  akp: Akp;
  subject: string;
  predicate: string;
  object: string;
  summary: string;


  constructor(private prefixService: PrefixService, private apiService: ApiService, private route: ActivatedRoute) {
    this.triples = [];
    this.loadingTriples = false;
    this.show = false;
    this.route.queryParams.subscribe(params => { this.subject = params['subj'] || '';
      this.predicate = params['pred'] || '';
      this.object = params['obj'] || '';
      this.summary = params['summary'] || ''; });
  }


  ngOnInit(): void {
    this.getPatternDetails(this.subject, this.predicate, this.object, this.summary);
  }


  getPatternDetails(subject: string, predicate: string, object: string, summary: string): void {
    let data: JSON[];
    this.apiService.browse(summary, subject, predicate, object, 1, 0).subscribe((response) => {
      data = response['akps'];
      data.map((el: any) => {
        this.akp = el;
      });
    });
  }


  getTriples(triplesRequest: ExtractorRequest): void {
    this.triples = [];
    this.show = false;
    this.request = triplesRequest;
    this.request.offset = 0;
    this.query();
  }


  query(): void {
    let data: JSON[];
    this.apiService.extractTriples(this.request)
      .subscribe((response) => {
        data = response['results']['bindings'];
        data.map((el: any) => {
          let triple: Triple;
          triple = new Triple(el.subj.value, el.pred.value, el.obj.value, null, null);
          this.triples.push(triple);
        });
        this.loadingTriples = false;
        this.show = true;
      });
  }


  loadMore() {
    this.request.offset += 1;
    this.loadingTriples = true;
    this.query();
  }


  prefix(uri: string): string {
    return this.prefixService.prefix(uri);
  }

}
