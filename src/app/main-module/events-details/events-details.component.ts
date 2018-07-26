import { Component, OnInit } from '@angular/core';
import { Event } from '../../_models';
import { ActivatedRoute } from '@angular/router';
import { FormatDateService } from '../../_services';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent implements OnInit {
  formatedDate: string;
  constructor(
    private route: ActivatedRoute,
    private formatDateService: FormatDateService
  ) { }
  event: Event;
  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
    this.formatedDate = this.formatDateService.formatDate(this.event.date);
  }

}
