import { Component, OnInit } from '@angular/core';
import { DonationService } from '../donation.service';
import { Donation } from '../../donation';

@Component({
  selector: 'app-donation-card',
  templateUrl: './donation-card.component.html',
  styleUrls: ['./donation-card.component.css']
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
}
