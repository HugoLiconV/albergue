import { Component, OnInit } from '@angular/core';
import { DonationService, AlertService } from '../../../_services';
import { Donation } from '../../../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation-card',
  templateUrl: './donation-card.component.html',
  styleUrls: ['../cards.css']
})
export class DonationCardComponent implements OnInit {
  donations: Donation[];

  constructor(
    private donationService: DonationService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getDonations();
  }

  getDonations(): void {
    this.donationService.getDonations().subscribe(donations => {
    this.donations = donations;
    }, error => {
      this.alertService.error('Error en servidor');
    });
  }

  handleClick(id) {
    this.router.navigate(['/donations-details', id]);
  }
}
