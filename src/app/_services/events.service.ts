import { Injectable } from '@angular/core';
import { Event } from '../_models';
import { environment} from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class EventsService {
  private eventUrl = `${environment.API_URL}/events`;  // URL to web api

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.eventUrl}/${id}`);
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventUrl, event);
  }
}
