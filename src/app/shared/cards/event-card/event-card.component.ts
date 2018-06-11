import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Event} from '../../../../event';
import {EventsService} from '../../../services/events.service';
import {FormatDateService} from '../../../services/format.date.service';
import {AlertService} from '../../../services/alert.service';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['../cards.css']
})
export class EventCardComponent implements OnInit {
  events: Event[];
  loading = false;
  @Output() buttonClick = new EventEmitter();

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

  buttonClicked(event: Event) {
    console.log('emitiendo');
    this.buttonClick.emit(event);
  }

  formatDate(date) {
    return this.formatDateService.formatDate(date);
  }
}
