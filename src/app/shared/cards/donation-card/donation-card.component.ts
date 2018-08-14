import { Component, OnInit } from '@angular/core';
import { DonationService, AlertService } from '../../../_services';
import { Donation } from '../../../_models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-donation-card',
  templateUrl: './donation-card.component.html',
  styleUrls: ['../cards.css']
})
export class DonationCardComponent implements OnInit {
  donations: Observable<Donation[]>;
  loading = false;

  constructor(
    private donationService: DonationService,
    private router: Router) { }

  ngOnInit() {
    this.donations = this.donationService.getDonations();
  }

  handleClick(id) {
    const currentRoute = this.router.url;
    if (currentRoute === '/home') {
      this.router.navigate(['/donations-details', id]);
    } else {
      this.router.navigate(['/admin/donation-form', id]);
    }
  }
}
