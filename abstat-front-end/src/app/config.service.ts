import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  backend: string;
  cluster_backend: string;

  constructor(private http: HttpClient) {
  }

  getHost(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get('assets/config.json')
        .subscribe((response) => {
          this.backend = response['backend_host'];
          this.cluster_backend = response['distributed-backend_host'];
          resolve(true);
        });
    });
  }

  getBackend(): string {
    return this.backend;
  }

  getClusterBackend(): string {
    return this.cluster_backend;
  }

}
