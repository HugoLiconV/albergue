import { Component, OnInit } from '@angular/core';
import { DONATIONS } from '../../../mock-donation';

@Component({
  selector: 'app-donations-details',
  templateUrl: './donations-details.component.html',
  styleUrls: ['./donations-details.component.css']
})
export class DonationsDetailsComponent implements OnInit {
  donations = DONATIONS;

  constructor() { }

  ngOnInit() {
  }

}
