import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

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
        'http://0.0.0.0:9000/auth',
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
        //   // return true to indicate successful login
        //   return true;
        // } else {
        //   // return false to indicate failed login
        //   return false;
        // }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    // this.token = null;
    localStorage.removeItem('currentUser');
  }
}
