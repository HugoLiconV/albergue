import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../../_services/';
import { Donation } from '../../../_models';

@Component({
  selector: 'app-donation-card',
  templateUrl: './donation-card.component.html',
  styleUrls: ['../cards.css']
})
export class DonationCardComponent implements OnInit {
  donations: Donation[];

  constructor(private donationService: DonationService) { }

  ngOnInit() {
    this.getDonations();
  }

  getDonations(): void {
    this.donationService.getDonations().subscribe(donations => this.donations = donations);
  }

  handleClick(data) {
    console.log(`dona: ${data}`);
  }
}
