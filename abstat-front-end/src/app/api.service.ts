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
import {ExtractorRequest} from './match-selector/match-selector.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string;
  clusterBaseUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = this.configService.getBackend();
    this.clusterBaseUrl = this.configService.getClusterBackend();
  }

  /********************************************* GET Requests *******************************************************/

  getDatasets(singleM: boolean, cluster: boolean): Dataset[] {
    const datasets: Dataset[] = [];
    let data: JSON[];
    this.http.get(this.baseUrl + '/api/v1/datasets')
      .subscribe((response) => {
        data = response['datasets'];
        data.map((el: any) => {
          const dataset: Dataset = el;
          if (singleM && dataset.server === 'single-machine' || cluster && dataset.server === 'cluster') {
            datasets.push(dataset);
          } else if (singleM === null && cluster === null) {
            datasets.push(dataset);
          }
        });
      });
    return datasets;
  }


  getOntologies(singleM: boolean, cluster: boolean): Ontology[] {
    const ontologies: Ontology[] = [];
    let data: JSON[];
    this.http.get(this.baseUrl + '/api/v1/ontologies')
      .subscribe((response) => {
        data = response['ontologies'];
        data.map((el: any) => {
          const ontology: Ontology = el;
          if (singleM && ontology.server === 'single-machine' || cluster && ontology.server === 'cluster') {
            ontologies.push(ontology);
          } else if (singleM === null && cluster === null) {
            ontologies.push(ontology);
          }
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


  browse(summary: string, subjConstraint, predConstraint, objConstraint, limit, offset): Observable<Object> {
    return this.http.get(this.baseUrl + '/api/v1/browse?enrichWithSPO=true&summary=' + summary +
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


  extractMatches(request: ExtractorRequest): Observable<Object>{
    const url = this.baseUrl + '/api/v1/groupedExtractor?subj=' + encodeURIComponent(request.subj) +
      '&pred=' + encodeURIComponent(request.pred) +
      '&obj=' + encodeURIComponent(request.obj) +
      '&dataset=' + request.dataset +
      '&ontology=' + request.ontology +
      '&akpType=' + request.akpType +
      '&predictedCardinality=' + request.predictedCardinality +
      '&cardinalityType=' + request.cardinalityType +
      '&limit=' + request.limit +
      '&offset=' + request.offset +
      '&sort=' + request.sort;

    return this.http.get(url);
  }

  extractTriples(request: ExtractorRequest): Observable<Object>{
    const url = this.baseUrl + '/api/v1/singleExtractor?subj=' + encodeURIComponent(request.subj) +
      '&pred=' + encodeURIComponent(request.pred) +
      '&obj=' + encodeURIComponent(request.obj) +
      '&dataset=' + request.dataset +
      '&ontology=' + request.ontology +
      '&akpType=' + request.akpType +
      '&cardinalityType=' + request.cardinalityType +
      '&limit=' + request.limit +
      '&offset=' + request.offset;

    return this.http.get(url);
  }


  /********************************************* POST Requests *******************************************************/

  consolidate(cluster: boolean, request: ConsolidateRequest): Observable<Object> {
    const url = this.getUrl(cluster);
    const data = 'summary=' + request.summary.id + '&store=' + request.stored +
      '&index=' + request.indexed + '&domain=' + request.domain;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post(url + '/api/v1/consolidate', data, httpOptions);
  }


  upload(cluster: boolean, file: File, mode: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    const formData = new FormData();
    formData.append('file', file);

    let url = this.getUrl(cluster);
    if (mode === 'dataset') {
      url += '/api/v1/upload/ds';
    } else {
      url += '/api/v1/upload/ont';
    }
    return this.http.post(url, formData, httpOptions);
  }

  manage(cluster: boolean, type: string, command: string, id: string): Observable<Object> {
    const url = this.getUrl(cluster);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post(url + '/api/v1/' + type + '/' + command + '/' + id, {}, httpOptions);
  }

  summarize(cluster: boolean, request: SummarizationRequest): Observable<Object> {
    const url = this.getUrl(cluster);
    let data = 'dataset=' + request.dataset.id + '&concept_min=' + request.concept_min + '&inference=' + request.inference +
      '&cardinality=' + request.cardinality + '&property_min=' + request.property_min + '&rich_cardinalities=' + request.rich_cardinalities + '&email=' + request.email +
      '&shacl_validation=' + request.shacl_validation;
    if (request.ontology !== undefined) {
      data += '&ontologies=' + request.ontology.id;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post(url + '/api/v1/summarizator', data, httpOptions);
  }



  /********************************************* Utils *******************************************************/

  getUrl(cluster: boolean): string{
    let url = '';
    if (cluster) {
      url = this.clusterBaseUrl;
    } else {
      url = this.baseUrl;
    }
    return url;
  }

}
