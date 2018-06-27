import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Summary} from '../summary';

@Component({
  selector: 'app-summary-selector',
  templateUrl: './summary-selector.component.html',
})
export class SummarySelectorComponent implements OnInit {
  summaries: Summary[] = [];
  @Output() onSummarySelected: EventEmitter<Summary>;

  constructor(private http: Http) {
    this.onSummarySelected = new EventEmitter<Summary>();

  }

  ngOnInit() {
    this.obtainSummaries();
  }

  obtainSummaries(): void {
    let  data: JSON[];
    this.http.get('http://backend.abstat.disco.unimib.it/api/v1/summaries?loaded=true')
      .subscribe((res: Response) => {
        data = res.json().summaries;
        data.map((el: any) => {
          const summary: Summary = el;
          this.summaries.push(summary);
        });
      });
  }

  checked(summary: Summary): void {
    this.onSummarySelected.emit(summary);
  }


}
