import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {Triple} from '../triple';
import {isUndefined} from 'util';
import {PrefixService} from '../prefix.service';
import {Akp} from '../akp';

@Component({
  selector: 'app-match-selector',
  templateUrl: './match-selector.component.html',
})
export class MatchSelectorComponent implements OnInit {
  request: ExtractorRequest;
  triples: Triple[];
  direct: boolean;
  loadingTriples: boolean;
  @Output() onMatchSelected: EventEmitter<ExtractorRequest>;
  @Input() cardinalityType: string;
  @Input() akp: Akp;


  constructor(private prefixService: PrefixService, private apiService: ApiService, private route: ActivatedRoute) {
    this.triples = [];
    this.request = new ExtractorRequest();
    this.loadingTriples = false;
    this.onMatchSelected = new EventEmitter<ExtractorRequest>();


  }


  ngOnInit() {
    this.request.subj = this.akp.subject.globalURL;
    this.request.pred = this.akp.predicate.globalURL;
    this.request.obj = this.akp.object.globalURL;
    this.request.dataset = this.akp.datasetOfOrigin;
    this.request.ontology = this.akp.ontologiesOfOrigin[0];
    if (this.akp.type.toLowerCase().includes('datatype')) {
      this.request.akpType = 'DatatypeAKP';
    } else {
      this.request.akpType = 'ObjectAKP';
    }

    if (this.cardinalityType === 'MaxSubjsObj') {
      this.request.predictedCardinality = this.akp.predictedCardinalityDirect;
    } else {
      this.request.predictedCardinality = this.akp.predictedCardinalityInverse;
    }
    this.request.cardinalityType = this.cardinalityType;
    this.request.limit = 5;
    this.request.offset = 0;

    this.getMatches();
  }


  getMatches () {
    let data: JSON[];
    this.apiService.extractMatches(this.request)
      .subscribe((response) => {
        data = response['results']['bindings'];
        data.map((el: any) => {
          let triple: Triple;
          if (isUndefined(el.subj)){
            this.direct = true;
            triple = new Triple(null, el.pred.value, el.obj.value, el.nsubjs.value, null);
          } else {
            this.direct = false;
            triple = new Triple(el.subj.value, el.pred.value, null, null, el.nobjs.value);
          }
          this.triples.push(triple);
        });
        this.loadingTriples = false;
      });
  }


  loadMore() {
    this.request.offset += 1;
    this.loadingTriples = true;
    this.getMatches();
  }


  checked(entity: string): void {
    const triplesRequest = new ExtractorRequest();
    if (this.cardinalityType === 'MaxSubjsObj') {
      triplesRequest.subj = this.request.subj;
      triplesRequest.obj = entity;
    } else {
      triplesRequest.subj = entity;
      triplesRequest.obj = this.request.obj;
    }
    triplesRequest.pred = this.request.pred;
    triplesRequest.dataset = this.request.dataset;
    triplesRequest.ontology = this.request.ontology;
    triplesRequest.akpType = this.request.akpType;
    triplesRequest.predictedCardinality = null;
    triplesRequest.cardinalityType = this.request.cardinalityType;
    triplesRequest.limit = this.request.limit;
    triplesRequest.offset = this.request.offset;
    this.onMatchSelected.emit(triplesRequest);
  }


  prefix(uri: string): string {
    return this.prefixService.prefix(uri);
  }
}



export class ExtractorRequest {
  subj: string;
  pred: string;
  obj: string;
  dataset: string;
  ontology: string;
  akpType: string;
  predictedCardinality: number;
  cardinalityType: string;
  limit: number;
  offset: number;

  constructor() {
  }
}
