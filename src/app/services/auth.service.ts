import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<boolean> {
    const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };
    const encoded_data = JSON.stringify({'access_token': environment.ACCESS_TOKEN});
    return this.http
      .post(
        `${environment.API_URL}/auth`,
        encoded_data,
        httpOptions
      )
      .map((response: Response) => {
        console.log(response)
        const token = response.token && response.user;
        if (token) {
          localStorage.setItem(
            'currentUser',
            JSON.stringify({ username: username, token: token })
          );

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    // this.token = null;
    localStorage.removeItem('currentUser');
  }
}

/* 
  login(username: string, password: string) {
    const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };
    const encoded_data = JSON.stringify({'access_token': '87QMEbJvVTgbG62wkdBHdJkr9XNTzt6j'});
    return this.http
      .post<any>(
        `${environment.API_URL}/auth`,
        encoded_data,
        httpOptions
      )
      .map((user) => {
        // const token = response.token && response.user;
        console.log(user);
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
 */