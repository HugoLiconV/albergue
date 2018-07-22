import {Component, OnInit} from '@angular/core';
import {Event} from '../../../_models';
import {
  EventsService,
  FormatDateService,
  AlertService} from '../../../_services';

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
      if (error.status) {
        this.alertService.error('Error conectandose con el servidor');
      }
      this.loading = false;
    });
  }

  handleClick(data) {
    console.log(`eve: ${data}`);
  }

  formatDate(date) {
    return this.formatDateService.formatDate(date);
  }
}
