import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ontology} from '../ontology';
import { Http, Response } from '@angular/http';
import {Dataset} from '../dataset';

@Component({
  selector: 'app-datasetontology-selector',
  templateUrl: './datasetontology-selector.component.html',
})
export class DatasetontologySelectorComponent implements OnInit {
  items: any[] = [];
  @Input() type: string;
  @Input() allowSelection: boolean;
  @Output() onItemSelected: EventEmitter<string>;

  constructor(private http: Http) {
    this.onItemSelected = new EventEmitter<string>();
  }

  ngOnInit() {
    if (this.type === 'dataset') {
      this.getDatasets();
    }
    else {
      this.getOntologies();
    }
  }

  getDatasets(): void{
    let data: JSON[];
    this.http.get('http://backend.abstat.disco.unimib.it/api/v1/datasets')
      .subscribe((res: Response) => {
        data = res.json().datasets;
        data.map((el: any) => {
          const dataset: Dataset = el;
          this.items.push(dataset);
        });
      });
  }

  getOntologies(): void{
    let data: JSON[];
    this.http.get('http://backend.abstat.disco.unimib.it/api/v1/ontologies')
      .subscribe((res: Response) => {
        data = res.json().ontologies;
        data.map((el: any) => {
          const ontology: Ontology = el;
          this.items.push(ontology);
        });
      });
  }

  checked(arg: any): void {
    this.onItemSelected.emit(arg.id);
  }

}
