import { Injectable } from '@angular/core';
import { Event } from '../_models';
import { environment} from '../../environments/environment';

import { Observable } from 'rxjs/RX';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HandleErrorService } from './handle.error.service';
@Injectable()
export class EventsService {
  private eventUrl = `${environment.API_URL}/events`;  // URL to web api

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
    ) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl)
      .pipe(catchError(this.handleErrorService.handleError<Event[]>('obteniendo eventos', [])));
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.eventUrl}/${id}`)
      .pipe(catchError(this.handleErrorService.handleError<Event>('obteniendo evento')));
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventUrl, event)
      .pipe(catchError(this.handleErrorService.handleError<Event>('añadiendo evento')));
  }

  editEvent(event: Event, id: string): Observable<Event> {
    return this.http.put<Event>(`${this.eventUrl}/${id}`, event)
      .pipe(catchError(this.handleErrorService.handleError<Event>('editando evento')));
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.eventUrl}/${id}`)
      .pipe(catchError(this.handleErrorService.handleError<any>('eliminando evento')));
  }
}
