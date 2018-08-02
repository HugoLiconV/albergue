import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataRefreshService {
  private subject = new Subject<any>();
  constructor() { }

  refresh() {
    this.subject.next(true);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
