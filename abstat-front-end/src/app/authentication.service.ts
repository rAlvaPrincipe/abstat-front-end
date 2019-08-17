import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from "./auth.constant";
import {BACKEND} from "./auth.constant";

@Injectable()
export class AuthenticationService {
  AUTH_TOKEN = BACKEND +  '/oauth/token';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD)
      })
    };

    return this.http.post(this.AUTH_TOKEN, body, httpOptions)
      .map(res => res)
      .map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      });
  }
}
