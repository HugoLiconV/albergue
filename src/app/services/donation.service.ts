import { Injectable } from '@angular/core';
import { Donation } from '../../donation';
import { DONATIONS } from '../../mock-donation';
import { environment} from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class DonationService {
  private donationUrl = `${environment.API_URL}/donations`;  // URL to web api

  constructor(private http: HttpClient) { }

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(this.donationUrl);
  }
}
