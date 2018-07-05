import {Component} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
})
export class ManageComponent {

  type: string;
  id: string;
  enableButtons: boolean;
  showButtons: boolean;

  constructor(private http: Http) {
    this.enableButtons = false;
    this.showButtons = false;
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
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({ headers: headers });
    this.http.post('http://localhost/' + this.type + '/' + command + '/' + this.id, {}, options).subscribe(res => console.log(res.json()));
  }

}
