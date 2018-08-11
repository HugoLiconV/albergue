import { Injectable } from '@angular/core';
import { Record } from '../_models';
import { environment} from '../../environments/environment';

// import { Observable } from 'rxjs/RX';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HandleErrorService } from './handle.error.service';
import { Observable } from 'rxjs/Observable';
import { RecordResponse } from '../_models/record.response';
@Injectable()
export class RecordService {
  private url = `${environment.API_URL}/registros`;  // URL to web api

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
    ) { }

  getRecords(query = ''): Observable<RecordResponse> {
    return this.http.get<RecordResponse>(`${this.url}?${query}`)
      .pipe(catchError(this.handleErrorService.handleError<RecordResponse>('obteniendo registros')));
  }

  getRecordById(id: string): Observable<Record> {
    return this.http.get<Record>(`${this.url}/${id}`)
      .pipe(catchError(this.handleErrorService.handleError<Record>('obteniendo registro')));
  }

  // editPerson(record: Record, id: string): Observable<Record> {
  //   return this.http.put<Record>(`${this.url}/${id}`, record)
  //     .pipe(catchError(this.handleErrorService.handleError<Record>('editando registro')));
  // }

  deleteRecord(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`)
      .pipe(catchError(this.handleErrorService.handleError<any>('eliminando registro')));
  }
}
