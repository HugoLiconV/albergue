import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Donation } from '../../_models';
@Component({
  selector: 'app-donations-details',
  templateUrl: './donations-details.component.html',
  styleUrls: ['./donations-details.component.css']
})
export class DonationsDetailsComponent implements OnInit {
  donation: Donation;
  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.donation = this.route.snapshot.data['donation'];
  }

}
