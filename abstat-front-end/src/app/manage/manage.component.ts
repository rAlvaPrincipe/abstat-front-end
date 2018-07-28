import {Component} from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
})
export class ManageComponent {

  type: string;
  id: string;
  enableButtons: boolean;
  showButtons: boolean;
  managing: boolean;

  constructor(private apiService: ApiService) {
    this.enableButtons = false;
    this.showButtons = false;
    this.managing = false;
  }

  setId(id: string): void {
    this.id = id;
    this.enableButtons = true;
  }

  onTypeSelection(): void{
    this.enableButtons = false;
    this.showButtons = true;
  }

  delete(command: string): void {
    this.managing = true;
    this.apiService.manage(this.type, command, this.id)
      .subscribe(response => {
          location.reload();},
        (err) => {
          location.reload();
        });
  }

}
