import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs/RX';

@Injectable()
export class HandleErrorService {

  constructor(private alertService: AlertService) { }

  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.error.message) {
        this.alertService.error(`Error ${operation}: ${error.error.message}`);
      } else {
        this.alertService.error(`Error ${operation}: ${error.message}`);
      }
      return Observable.of(result as T);
    };
  }
}
