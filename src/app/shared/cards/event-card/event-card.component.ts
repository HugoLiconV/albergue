import {Component, OnInit} from '@angular/core';
import {Event} from '../../../_models';
import {
  EventsService,
  FormatDateService,
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
    private formatDateService: FormatDateService,
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
      this.loading = false;
    }, error => {
      this.alertService.error('Error en servidor');
      this.loading = false;
    });
  }

  handleClick(id) {
    this.router.navigate(['/event-details', id]);
  }

  formatDate(date) {
    return this.formatDateService.formatDate(date);
  }
}
