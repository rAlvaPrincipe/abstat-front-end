import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Summary} from '../summary';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-summary-selector',
  templateUrl: './summary-selector.component.html'
})
export class SummarySelectorComponent implements OnInit {
  summaries: Summary[] = [];
  @Input() getEverySummary: boolean;
  @Output() onSummarySelected: EventEmitter<Summary>;
  _profile: Profile;

  constructor(private apiService: ApiService) {
    this.onSummarySelected = new EventEmitter<Summary>();
  }

  ngOnInit() {
    if (!this.getEverySummary) {
      this.summaries = this.apiService.getSummaries(true, null);
    } else {
      this.summaries = this.apiService.getSummaries(null, null);
    }
  }

  @Input()
  set profile(profile: string) {
    if (profile === 'home') {
      this._profile = new Profile(false, true, true, true, true, true, true, true, true, true, true, true, true);
    } else if (profile === 'browse') {
      this._profile = new Profile(true, false, true, true, true, false, true, true, true, true, true, false, false);
    } else if ( profile === 'consolidate') {
      this._profile = new Profile(true, false, true, true, true, true, true, true, true, true, true, true, true);
    } else if ( profile === 'manage') {
      this._profile = new Profile(true, false, true, true, true, true, true, true, true, true, true, true, true);
    }
  }

  checked(summary: Summary): void {
    this.onSummarySelected.emit(summary);
  }

}


export class Profile {
  public selector: boolean;
  public id: boolean;
  public dataset: boolean;
  public ontology: boolean;
  public timestamp: boolean;
  public server: boolean;
  public tipoMinimo: boolean;
  public inference: boolean;
  public cardinality: boolean;
  public propertyMinimaliz: boolean;
  public shaclValidation: boolean;
  public loadedMongoDB: boolean;
  public indexedSolr: boolean;

  constructor(selector: boolean, id: boolean, dataset: boolean, ontology: boolean, timestamp: boolean, server: boolean, tipoMinimo: boolean, inference: boolean, cardinality: boolean, propertyMinimaliz: boolean, shaclValidation: boolean, loadedMongoDB: boolean, indexedSolr) {
    this.selector = selector;
    this.id = id;
    this.dataset = dataset;
    this.ontology = ontology;
    this.timestamp = timestamp;
    this.server = server;
    this.tipoMinimo = tipoMinimo;
    this.inference = inference;
    this.cardinality = cardinality;
    this.propertyMinimaliz = propertyMinimaliz;
    this.shaclValidation = shaclValidation;
    this.loadedMongoDB = loadedMongoDB;
    this.indexedSolr = indexedSolr;
  }
}

