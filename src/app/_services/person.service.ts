import { Injectable } from '@angular/core';
import { Person } from '../_models';
import { environment} from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HandleErrorService } from './handle.error.service';
@Injectable()
export class PersonService {
  private url = `${environment.API_URL}/people`;  // URL to web api

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
    ) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url)
      .pipe(catchError(this.handleErrorService.handleError<Person[]>('obteniendo usuarios', [])));
  }

  getPersonById(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.url}/${id}`)
      .pipe(catchError(this.handleErrorService.handleError<Person>('obteniendo usuario')));
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.url, person)
      .pipe(catchError(this.handleErrorService.handleError<Person>('añadiendo usuario')));
  }

  editPerson(person: Person, id: string): Observable<Person> {
    return this.http.put<Person>(`${this.url}/${id}`, person)
      .pipe(catchError(this.handleErrorService.handleError<Person>('editando usuario')));
  }

  deletePerson(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`)
      .pipe(catchError(this.handleErrorService.handleError<any>('eliminando usuario')));
  }
}
