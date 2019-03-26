import {Injectable} from '@angular/core';
import {Summary} from './summary';
import {Dataset} from './dataset';
import {Ontology} from './ontology';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs/internal/Observable';
import {SearchRequest} from './search-form/search-form.component';
import {ConsolidateRequest} from './consolidate/consolidate.component';
import {SummarizationRequest} from './summarize/summarize.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.getbackend();
  }

  /********************************************* GET Requests *******************************************************/

  getDatasets(): Dataset[] {
    const datasets: Dataset[] = [];
    let data: JSON[];
    this.http.get(this.baseUrl + '/api/v1/datasets')
      .subscribe((response) => {
        data = response['datasets'];
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
    this.http.get(this.baseUrl + '/api/v1/ontologies')
      .subscribe((response) => {
        data = response['ontologies'];
        data.map((el: any) => {
          const ontology: Ontology = el;
          ontologies.push(ontology);
        });
      });
    return ontologies;
  }


  getSummaries(stored: boolean, indexed: boolean): Summary[] {
    let url = this.baseUrl + '/api/v1/summaries?';
    if (stored !== null && indexed !== null) {
      url += 'stored=' + stored + '&indexed=' + indexed;
    } else if (stored !== null) {
      url += 'loaded=' + stored;
    } else if (indexed !== null) {
      url += 'indexed=' + indexed;
    }

    const summaries: Summary[] = [];
    let data: JSON[];
    this.http.get(url)
      .subscribe((response) => {
        data = response['summaries'];
        data.map((el: any) => {
          const summary: Summary = el;
          summaries.push(summary);
        });
      });

    return summaries;
  }


  getDatasetsWhichSummariesAreIndexed(): Set<string> {
    const datasets: Set<string> = new Set<string>();
    let data: JSON[];
    this.http.get(this.baseUrl + '/api/v1/summaries?indexed=true')
      .subscribe((response) => {
        data = response['summaries'];
        data.map((el: any) => {
          const summary: Summary = el;
          datasets.add(summary.dsName);
        });
      });
    return datasets;
  }


  browse(summary: Summary, subjConstraint, predConstraint, objConstraint, limit, offset): Observable<Object> {
    return this.http.get(this.baseUrl + '/api/v1/browse?enrichWithSPO=true&summary=' + summary.id +
      '&subj=' + encodeURIComponent(subjConstraint) + '&pred=' + encodeURIComponent(predConstraint) +
      '&obj=' + encodeURIComponent(objConstraint) + '&limit=' + limit + '&offset=' + offset);
  }


  search(request: SearchRequest): Observable<Object> {
    let url = this.baseUrl + '/api/v1/search?q=' + request.query + '&rows=' + request.rows +
      '&start=' + request.start + '&includeNPref=' + request.includeNPref;

    if (request.dataset !== 'all') {
      url += '&dataset=' + request.dataset;
    }
    return this.http.get(url);
  }


  suggest(summary: Summary, position: string): Observable<Object> {
    return this.http.get(this.baseUrl + '/api/v1/SPO?position=' + position + '&summary=' + summary.id);
  }


  /********************************************* POST Requests *******************************************************/


  consolidate(request: ConsolidateRequest): Observable<Object> {
    const data = 'summary=' + request.summary + '&store=' + request.stored +
      '&index=' + request.indexed + '&domain=' + request.domain;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post(this.baseUrl + '/consolidate', data, httpOptions);
  }


  upload(file: File, mode: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    const formData = new FormData();
    formData.append('file', file);

    let url = this.baseUrl;
    if (mode === 'dataset') {
      url += '/upload/ds';
    } else {
      url += '/upload/ont';
    }
    return this.http.post(url, formData, httpOptions);
  }

  manage(type: string, command: string, id: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post(this.baseUrl + '/' + type + '/' + command + '/' + id, {}, httpOptions);
  }

  summarize(request: SummarizationRequest): Observable<Object> {
    let data = 'dataset=' + request.dataset.id + '&concept_min=' + request.concept_min + '&inference=' + request.inference +
      '&cardinality=' + request.cardinality + '&property_min=' + request.property_min + '&rich_cardinalities=' + request.rich_cardinalities + '&email=' + request.email;
    if (request.ontology !== undefined) {
      data += '&ontologies=' + request.ontology.id;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post(this.baseUrl + '/summarizator', data, httpOptions);
  }

}
