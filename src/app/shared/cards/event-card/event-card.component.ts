import {Component, OnInit} from '@angular/core';
import {Event} from '../../../_models';
import { EventsService, AlertService} from '../../../_services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['../cards.css']
})
export class EventCardComponent implements OnInit {
  events: Observable<Event[]>;
  loading = false;

  constructor(
    private eventService: EventsService,
    private router: Router) {
  }

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }

  handleClick(id) {
    const currentRoute = this.router.url;
    if (currentRoute === '/home') {
      this.router.navigate(['/event-details', id]);
    } else {
      this.router.navigate(['/admin/event-form', id]);
    }
  }
}
