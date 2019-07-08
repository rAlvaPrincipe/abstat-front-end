import {Component, OnInit} from '@angular/core';
import { Summary } from '../summary';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-consolidate',
  templateUrl: './consolidate.component.html',
})
export class ConsolidateComponent implements OnInit {
  summaries: Summary[];
  showTB: boolean;
  request = new ConsolidateRequest();
  consolidating: boolean;


  constructor( private apiService: ApiService, private router: Router) {
    this.summaries = [];
    this.showTB = false;
    this.consolidating = false;
  }

  ngOnInit() {
    this.summaries = this.apiService.getSummaries(null, null);
  }

  showTextBox(event): void {
    if (event.target.value === 'Custom') {
      this.showTB = true;
    } else {
      this.showTB = false;
    }
  }

  setSummary(selection: Summary): void {
    this.request.summary = selection;
  }

  onFormSubmit(): void {
    let cluster = false;
    if (this.request.summary.server === 'cluster') {
      cluster = true;
    }

    this.consolidating = true;
    this.apiService.consolidate(cluster, this.request)
      .subscribe(response => {
         location.reload();},
        (err) => {
          location.reload();
        });
  }

}

export class ConsolidateRequest {

  public summary: Summary;
  public stored: boolean;
  public indexed: boolean;
  public domain: String;

  constructor() {
    this.stored = false;
    this.indexed = false;
  }
}
