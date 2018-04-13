import { Injectable } from '@angular/core';
import { Event } from '../event';
import { EVENTS } from '../mock-events';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class EventsService {
  private eventUrl = 'http://0.0.0.0:9000/events';  // URL to web api

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl);
  }
}
