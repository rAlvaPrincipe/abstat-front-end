import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Http } from '@angular/http';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-datasetontology-selector',
  templateUrl: './datasetontology-selector.component.html',
})
export class DatasetontologySelectorComponent implements OnInit {
  items: any[] = [];
  @Input() type: string;
  @Input() allowSelection: boolean;
  @Output() onItemSelected: EventEmitter<string>;

  constructor(private http: Http, private apiService: ApiService) {
    this.onItemSelected = new EventEmitter<string>();
  }

  ngOnInit() {
    if (this.type === 'dataset') {
      this.items = this.apiService.getDatasets();
    }
    else {
      this.items = this.apiService.getOntologies();
    }
  }

  checked(arg: any): void {
    this.onItemSelected.emit(arg.id);
  }

}
