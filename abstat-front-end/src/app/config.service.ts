import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  backend: string;

  constructor(private http: HttpClient) {
  }

  getHost(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:4200/assets/config.json')
        .subscribe((response) => {
          this.backend = response['backend_host'];
          resolve(true);
        });
    })
  }

  getbackend(): string {
    return this.backend;
  }

}
