import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Dataset} from '../dataset';
import {Ontology} from '../ontology';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-summarize',
  templateUrl: './summarize.component.html'
})
export class SummarizeComponent implements OnInit {
  request: SummarizationRequest;
  datasets: Dataset[];
  ontologies: Ontology[];
  recap: boolean;
  _cluster: boolean;
  @Output() onSubmit: EventEmitter<SummarizationRequest>;

  constructor(private apiService: ApiService) {
    this.onSubmit = new EventEmitter<SummarizationRequest>();
    this.request = new SummarizationRequest();
    this.datasets = [];
    this.ontologies = [];
    this.recap = false;
  }

  ngOnInit() {
    this.cluster = false;
    this.datasets = this.apiService.getDatasets(true, false);
    this.ontologies = this.apiService.getOntologies(true, false);
  }

  onFormSubmit() {
    this.recap = true;
    this.onSubmit.emit(this.request);
  }


  @Input()
  set cluster(cluster: boolean) {
    this._cluster  = cluster;
    this.clear();
  }


  clear () {
    this.request = new SummarizationRequest();
    if (!this._cluster) {
      this.request.cluster = false;
      this.datasets = this.apiService.getDatasets(true, false);
      this.ontologies = this.apiService.getOntologies(true, false);
    } else {
      this.request.cluster = true;
      this.datasets = this.apiService.getDatasets(false, true);
      this.ontologies = this.apiService.getOntologies(false, true);
    }
    this.request.concept_min = false;
    this.request.inference = false;
    this.request.cardinality = false;
    this.request.property_min = false;
    this.request.shacl_validation = false;
  }

}


export class SummarizationRequest {
  dataset: Dataset;
  ontology: Ontology;
  cluster: boolean;
  concept_min: boolean;
  inference: boolean;
  cardinality: boolean;
  property_min: boolean;
  shacl_validation: boolean;
  email: string;

  constructor() {
    this.concept_min = false;
    this.inference = false;
    this.inference = false;
    this.cardinality = false;
    this.property_min = false;
    this.shacl_validation = false;
  }
}
