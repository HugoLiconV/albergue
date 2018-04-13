import { Injectable } from '@angular/core';
import { Donation } from '../donation';
import { DONATIONS } from '../mock-donation';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class DonationService {
  private donationUrl = 'http://0.0.0.0:9000/donations';  // URL to web api

  constructor(private http: HttpClient) { }

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(this.donationUrl);
  }
}
