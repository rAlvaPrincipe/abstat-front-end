import {Component, Input} from '@angular/core';
import {SummarizationRequest} from '../summarize/summarize.component';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-summarize-recap',
  templateUrl: './summarize-recap.component.html'
})
export class SummarizeRecapComponent {
  @Input() request: SummarizationRequest;
  submitted: boolean;

  constructor(private apiService: ApiService) {
    this.submitted = false;
  }

  onFormSubmit(): void {
    this.submitted = true;
    this.apiService.summarize(this.request.cluster, this.request)
      .subscribe(res =>
        console.log(res));
  }

}
