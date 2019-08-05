import {Component} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
})
export class ManageComponent {

  type: string;
  id: string;
  server: string;
  enableButtons: boolean;
  showButtons: boolean;
  managing: boolean;

  constructor(private apiService: ApiService) {
    this.enableButtons = false;
    this.showButtons = false;
    this.managing = false;
  }

  setObj(id: string, server: string): void {
    this.id = id;
    this.server = server;
    this.enableButtons = true;
  }

  onTypeSelection(): void {
    this.enableButtons = false;
    this.showButtons = true;
  }

  delete(command: string): void {
    this.managing = true;

    let cluster = false;
    if (this.server === 'cluster') {
      cluster = true;
    }

    this.apiService.manage(cluster, this.type, command, this.id)
      .subscribe(response => {
          location.reload(); },
        (err) => {
          location.reload();
        });
  }

}
