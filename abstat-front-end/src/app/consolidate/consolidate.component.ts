import {Component, OnInit} from '@angular/core';
import { Summary } from '../summary';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-consolidate',
  templateUrl: './consolidate.component.html',
})
export class ConsolidateComponent implements OnInit {
  summaries: Summary[];
  showTB: boolean;
  consolidate = new ConsolidateRequest();
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
    if(event.target.value === 'Custom')
      this.showTB = true;
    else
      this.showTB = false;
  }

  onFormSubmit(): void {
    this.consolidating = true;
    this.apiService.consolidate(this.consolidate)
      .subscribe(response => {
          location.reload();},
        (err) => {
          location.reload();
        });
  }

}

export class ConsolidateRequest {

  public summary: string;
  public stored: boolean;
  public indexed: boolean;
  public domain: String;

  constructor() {
    this.stored = false;
    this.indexed = false;
  }
}
