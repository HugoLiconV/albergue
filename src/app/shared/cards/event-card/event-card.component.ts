import {Component, OnInit} from '@angular/core';
import {Event} from '../../../../event';
import {EventsService} from '../../../services/events.service';
import {FormatDateService} from '../../../services/format.date.service';
import {AlertService} from '../../../services/alert.service';

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

  formatDate(date) {
    return this.formatDateService.formatDate(date);
  }
}
