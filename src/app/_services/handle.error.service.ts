import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class HandleErrorService {

  constructor(private alertService: AlertService) { }

  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      if (error.error && error.error.message) {
        this.alertService.error(`Error ${operation}: ${error.error.message}`);
      } else {
        this.alertService.error(`Error ${operation}: ${error.message}`);
      }
      return Observable.of(result as T);
    };
  }
}
