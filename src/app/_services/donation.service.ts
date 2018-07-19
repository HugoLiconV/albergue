import { Injectable } from '@angular/core';
import { Donation } from '../_models';
import { environment} from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class DonationService {
  private donationUrl = `${environment.API_URL}/donations`;  // URL to web api

  constructor(private http: HttpClient) { }

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(this.donationUrl);
  }
}
