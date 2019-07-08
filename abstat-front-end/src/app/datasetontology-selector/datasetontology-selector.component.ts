import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../api.service';
import {Dataset} from '../dataset';

@Component({
  selector: 'app-datasetontology-selector',
  templateUrl: './datasetontology-selector.component.html',
})
export class DatasetontologySelectorComponent implements OnInit {
  items: any[] = [];
  @Input() type: string;
  @Input() allowSelection: boolean;
  @Output() onItemSelected: EventEmitter<Dataset>;

  constructor(private apiService: ApiService) {
    this.onItemSelected = new EventEmitter<Dataset>();
  }

  ngOnInit() {
    if (this.type === 'dataset') {
      this.items = this.apiService.getDatasets(null, null);
    } else {
      this.items = this.apiService.getOntologies(null, null);
    }
  }

  checked(arg: Dataset): void {
    this.onItemSelected.emit(arg);
  }

}
