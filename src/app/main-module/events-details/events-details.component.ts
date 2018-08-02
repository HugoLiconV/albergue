import { Component, OnInit } from '@angular/core';
import { Event } from '../../_models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute
  ) { }
  event: Event;
  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
  }

}
