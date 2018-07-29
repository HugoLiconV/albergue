import { Injectable } from '@angular/core';
import { Donation } from '../_models';
import { environment} from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HandleErrorService } from './handle.error.service';


@Injectable()
export class DonationService {
  private donationUrl = `${environment.API_URL}/donations`;  // URL to web api

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
    ) { }

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(this.donationUrl)
      .pipe(catchError(this.handleErrorService.handleError<Donation[]>('obteniendo donaciones', [])));
  }

  getDonationById(id: string): Observable<Donation> {
    return this.http.get<Donation>(`${this.donationUrl}/${id}`)
      .pipe(catchError(this.handleErrorService.handleError<Donation>('obteniendo donación')));
  }

  addDonations(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(this.donationUrl, donation)
     .pipe(catchError(this.handleErrorService.handleError<Donation>('añadiendo donación')));
  }

  editDonation(donation: Donation, id: string): Observable<Donation> {
    return this.http.put<Donation>(`${this.donationUrl}/${id}`, donation)
      .pipe(catchError(this.handleErrorService.handleError<Donation>('editando donación')));
  }

  deleteDonation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.donationUrl}/${id}`)
      .pipe(catchError(this.handleErrorService.handleError<any>('eliminando donación')));
  }
}
