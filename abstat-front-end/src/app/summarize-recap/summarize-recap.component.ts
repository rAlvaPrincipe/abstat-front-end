import {Component, Input} from '@angular/core';
import {SummarizationRequest} from '../summarize/summarize.component';
import {Headers, Http, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-summarize-recap',
  templateUrl: './summarize-recap.component.html'
})
export class SummarizeRecapComponent {
  @Input() request: SummarizationRequest;
  submitted: boolean;

  constructor(private http: Http) {
    this.submitted = false;
  }

  onFormSubmit(): void {
    this.submitted = true;
    let data = 'dataset=' + this.request.dataset.id + '&concept_min=' + this.request.concept_min + '&inference=' + this.request.inference + '&cardinality=' + this.request.cardinality + '&property_min=' + this.request.property_min + '&email=' + this.request.email;
    if (this.request.ontology !== undefined) {
      data += '&ontologies=' + this.request.ontology.id;
    }
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    this.http.post('http://backend.abstat.disco.unimib.it/summarizator', data,  options).subscribe(res => console.log(res.json()));
  }

}
