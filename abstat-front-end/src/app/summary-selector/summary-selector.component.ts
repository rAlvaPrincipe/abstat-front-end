import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Http } from '@angular/http';
import { Summary} from '../summary';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-summary-selector',
  templateUrl: './summary-selector.component.html',
})
export class SummarySelectorComponent implements OnInit {
  summaries: Summary[] = [];
  @Input() getEverySummary: boolean;
  @Input() showStorageAttributes: boolean;
  @Input() allowSelection: boolean;
  @Output() onSummarySelected: EventEmitter<Summary>;

  constructor(private http: Http, private apiService: ApiService) {
    this.onSummarySelected = new EventEmitter<Summary>();
  }

  ngOnInit() {
    if (!this.getEverySummary) {
      this.summaries = this.apiService.getSummaries(true, null);
    }
    else {
      this.summaries = this.apiService.getSummaries(null, null);
    }
  }

  checked(summary: Summary): void {
    this.onSummarySelected.emit(summary);
  }
}
