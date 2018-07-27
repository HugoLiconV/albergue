import { Injectable } from '@angular/core';
import { Donation } from '../_models';
import { environment} from '../../environments/environment';

import { Observable } from 'rxjs/RX';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';


@Injectable()
export class DonationService {
  private donationUrl = `${environment.API_URL}/donations`;  // URL to web api

  constructor(
    private http: HttpClient,
    private alertService: AlertService
    ) { }

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(this.donationUrl)
      .pipe(catchError(this.handleError<Donation[]>('obteniendo donaciones', [])));
  }

  getDonationById(id: string): Observable<Donation> {
    return this.http.get<Donation>(`${this.donationUrl}/${id}`)
      .pipe(catchError(this.handleError<Donation>('obteniendo donación')));
  }

  addDonations(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(this.donationUrl, donation)
     .pipe(catchError(this.handleError<Donation>('añadiendo donación')));
  }

  editDonation(donation: Donation, id: string): Observable<Donation> {
    return this.http.put<Donation>(`${this.donationUrl}/${id}`, donation)
      .pipe(catchError(this.handleError<Donation>('editando donación')));
  }

  deleteDonation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.donationUrl}/${id}`)
      .pipe(catchError(this.handleError<any>('eliminando donación')));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(`Error ${operation}: ${error.message}`);
      return Observable.of(result as T);
    };
  }
}
