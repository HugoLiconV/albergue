import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: HttpClient) {
    // set token if saved in local storage
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser && currentUser.token;
  }


  login(username: string, password: string): Observable<boolean> {
    console.log(`username: ${username} password: ${password}`);
    const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };
    const encoded_data = JSON.stringify({'access_token': '87QMEbJvVTgbG62wkdBHdJkr9XNTzt6j'});
    return this.http
      .post(
        'http://0.0.0.0:9000/auth',
        encoded_data,
        httpOptions
      )
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        console.log(response);
        const token = response.token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
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

  // logout(): void {
  //   // clear token remove user from local storage to log user out
  //   this.token = null;
  //   localStorage.removeItem('currentUser');
  // }
}
