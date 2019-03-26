import { Component, OnInit } from '@angular/core';
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

  constructor(private apiService: ApiService) {
    this.request = new SummarizationRequest();
    this.datasets = [];
    this.ontologies = [];
    this.recap = false;
  }

  ngOnInit() {
    this.datasets = this.apiService.getDatasets();
    this.ontologies = this.apiService.getOntologies();
  }

  onFormSubmit() {
    this.recap = true;
  }
}


export class SummarizationRequest {
  dataset: Dataset;
  ontology: Ontology;
  concept_min: boolean;
  inference: boolean;
  cardinality: boolean;
  property_min: boolean;
  rich_cardinalities: boolean;
  email: string;

  constructor() {
    this.concept_min = false;
    this.inference = false;
    this.inference = false;
    this.cardinality = false;
    this.property_min = false;
    this.rich_cardinalities = false;
  }
}
