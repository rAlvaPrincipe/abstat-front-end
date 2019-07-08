import {Component, OnInit} from '@angular/core';
import {SummarizationRequest} from '../summarize/summarize.component';


@Component({
  selector: 'app-backend-selector',
  templateUrl: './backend-selector.component.html'
})
export class BackendSelectorComponent implements OnInit {
   cluster: boolean;
   recap: boolean;
   request: SummarizationRequest;


  ngOnInit() {
    this.cluster = false;
    this.recap = false;
  }

  checked(cluster: boolean): void {
    this.cluster = cluster;
  }

  setRequest(request: SummarizationRequest) {
    this.request = request;
    this.recap = true;
  }

}
