import {Component, OnInit} from '@angular/core';
import {Event} from '../../../_models';
import {
  EventsService,
  AlertService} from '../../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['../cards.css']
})
export class EventCardComponent implements OnInit {
  events: Event[];
  loading = false;

  constructor(
    private eventService: EventsService,
    private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.loading = true;
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    }, error => {
      this.alertService.error('Error en servidor');
    }, () => this.loading = false);
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
