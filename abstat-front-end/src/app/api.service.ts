import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Summary} from './summary';
import {Dataset} from './dataset';
import {Ontology} from './ontology';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://backend.abstat.disco.unimib.it/';

  constructor(private http: Http) { }

  getDatasets(): Dataset[] {
    const datasets: Dataset[] = [];
    let data: JSON[];
    this.http.get(this.baseUrl + 'api/v1/datasets')
      .subscribe((res: Response) => {
        data = res.json().datasets;
        data.map((el: any) => {
          const dataset: Dataset = el;
          datasets.push(dataset);
        });
      });
    return datasets;
  }

  getOntologies(): Ontology[] {
    const ontologies: Ontology[] = [];
    let data: JSON[];
    this.http.get(this.baseUrl + 'api/v1/ontologies')
      .subscribe((res: Response) => {
        data = res.json().ontologies;
        data.map((el: any) => {
          const ontology: Ontology = el;
          ontologies.push(ontology);
        });
      });
    return ontologies;
  }

  getSummaries(stored: boolean, indexed: boolean): Summary[] {
    let url = this.baseUrl + 'api/v1/summaries?';
    if (stored !== null && indexed !== null) {
      url += 'stored=' + stored + '&indexed=' + indexed ;
    }
    else if (stored !== null) {
      url += 'loaded=' +  stored;
    }
    else if (indexed !== null) {
      url += 'indexed=' +  indexed;
    }

    const summaries: Summary[] = [];
    let data: JSON[];
    this.http.get(url)
      .subscribe((res: Response) => {
        data = res.json().summaries;
        data.map((el: any) => {
          const summary: Summary = el;
          summaries.push(summary);
        });
      });
    console.log(summaries.length);
    return summaries;
  }

  getDatasetsWhichSummariesAreIndexed(): Set<string> {
    const datasets: Set<string> = new Set<string>();
    let  data: JSON[];
    this.http.get(this.baseUrl + 'api/v1/summaries?indexed=true')
      .subscribe((res: Response) => {
        data = res.json().summaries;
        data.map((el: any) => {
          const summary: Summary = el;
          datasets.add(summary.dsName);
        });
      });
    return datasets;
  }
}
