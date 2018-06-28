import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Summary } from '../summary';
import { Dataset } from '../dataset';
import { Ontology } from '../ontology';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  summaries: Summary[];
  datasets: Dataset[];
  ontologies: Ontology[];
  constructor(private http: Http) { }

  ngOnInit() {
    this.summaries = [];
    this.datasets = [];
    this.ontologies = [];
    this.getSummaries();
    this.getDatasets();
    this.getOntologies();
  }

  getSummaries(): void {
    let data: JSON[];
    this.http.get('http://backend.abstat.disco.unimib.it/api/v1/summaries')
      .subscribe((res: Response) => {
        data = res.json().summaries;
        data.map((el: any) => {
          const summary: Summary = el;
          this.summaries.push(summary);
        });
      });
  }

  getDatasets(): void{
    let data: JSON[];
    this.http.get('http://backend.abstat.disco.unimib.it/api/v1/datasets')
      .subscribe((res: Response) => {
        data = res.json().datasets;
        data.map((el: any) => {
          const dataset: Dataset = el;
          this.datasets.push(dataset);
        });
      });
  }

  getOntologies(): void{
    let data: JSON[];
    this.http.get('http://backend.abstat.disco.unimib.it/api/v1/ontologies')
      .subscribe((res: Response) => {
        data = res.json().ontologies;
        data.map((el: any) => {
          const ontology: Ontology = el;
          this.ontologies.push(ontology);
        });
      });
  }

}
