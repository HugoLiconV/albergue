import { Injectable } from '@angular/core';
import { DonationService } from './donation.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Donation } from '../_models';

@Injectable()
export class DonationResolverService {
  sub: any;
  constructor(
    private donationService: DonationService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Donation> {
    const id = route.paramMap.get('id');
    return this.donationService.getDonationById(id).pipe();
  }
}
