import {Component, OnInit} from '@angular/core';
import {Event} from '../../../../event';
import {EventsService} from '../../../services/events.service';
import {FormatDateService} from '../../../services/format.date.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['../cards.css']
})
export class EventCardComponent implements OnInit {
  events: Event[];

  constructor(
    private eventService: EventsService,
    private formatDateService: FormatDateService) {
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => this.events = events);
  }

  formatDate(date) {
    return this.formatDateService.formatDate(date);
  }
}
