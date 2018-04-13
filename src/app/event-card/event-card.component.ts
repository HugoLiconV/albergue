import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../../event';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  events: Event[];

  constructor(private eventService: EventsService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => this.events = events);
  }

  formatDate(date) {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Deciembre'
    ];

    const myDate = new Date(date);
    const day = myDate.getDate();
    const monthIndex = myDate.getMonth();
    const year = myDate.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
}
