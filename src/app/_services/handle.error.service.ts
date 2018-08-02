import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

@Injectable()
export class HandleErrorService {

  constructor(
    private alertService: AlertService,
    private router: Router) { }

  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401) {
        this.alertService.error(`Error ${operation}: ${error.statusText}`);
        this.router.navigate(['/admin/login']);
      } else if (error.error && error.error.message) {
        this.alertService.error(`Error ${operation}: ${error.error.message}`);
      } else {
        this.alertService.error(`Error ${operation}: ${error.message}`);
      }
      return Observable.of(result as T);
    };
  }
}
