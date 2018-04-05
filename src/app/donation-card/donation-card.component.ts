import { Component, OnInit } from '@angular/core';
import { DONATIONS } from '../../mock-donation';

@Component({
  selector: 'app-donation-card',
  templateUrl: './donation-card.component.html',
  styleUrls: ['./donation-card.component.css']
})
export class DonationCardComponent implements OnInit {
  donations = DONATIONS;

  constructor() { }

  ngOnInit() {
  }

}
