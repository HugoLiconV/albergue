import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs/RX';

@Injectable()
export class HandleErrorService {

  constructor(private alertService: AlertService) { }

  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(`Error ${operation}: ${error.message}`);
      return Observable.of(result as T);
    };
  }
}
