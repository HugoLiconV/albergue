import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// noinspection TypeScriptCheckImport
import {default as _rollupMoment, Moment} from 'moment';
import { EventsService, AlertService } from '../../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../../_models';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['../forms.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
    ]
})
export class EventFormComponent implements OnInit {

  innerWidth: any;
  isMobile: boolean;

  constructor(
    private eventService: EventsService,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.innerWidth = window.innerWidth;
    this.isMobile = this.checkScreenSize();
  }

  eventForm: FormGroup;
  event: Event;
  id: string;
  checkScreenSize(): boolean {
    return this.innerWidth < 840;
  }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      hour: ['', Validators.required]
    });
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.eventService.getEventById(this.id).subscribe(event => {
        if (event) {
          this.event = event;
          this.eventForm.setValue({
            name: this.event.name,
            description: this.event.description,
            cost: this.event.cost,
            location: this.event.location,
            date: this.event.date,
            hour: this.event.hour
          });
        }
      });
    }
  }

  addEvent(formValues) {
    const isNewEvent = this.id === undefined;
    if (isNewEvent) {
      this.eventService.addEvent(formValues).subscribe(_ => {
        this.alertService.success('Se agregó Evento con éxito');
        this.router.navigate(['/admin/dashboard']);
      });
    } else {
      this.eventService.editEvent(formValues, this.id).subscribe(_ => {
        this.alertService.success('Se Modificó Evento con éxito');
        this.router.navigate(['/admin/dashboard']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/dashboard']);
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.id).subscribe(_ => {
      this.alertService.success('Evento eliminado con éxito');
      this.router.navigate(['/admin/dashboard']);
    });
  }
}
