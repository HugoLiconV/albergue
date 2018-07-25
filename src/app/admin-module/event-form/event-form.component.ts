import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// noinspection TypeScriptCheckImport
import {default as _rollupMoment, Moment} from 'moment';
import { EventsService, AlertService } from '../../_services';
import { Router } from '@angular/router';
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
    private alertService: AlertService
  ) {
    this.innerWidth = window.innerWidth;
    this.isMobile = this.checkScreenSize();
  }
  date = new FormControl(moment());
  eventForm: FormGroup;
  checkScreenSize(): boolean {
    return this.innerWidth < 840;
  }

  ngOnInit() {
    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    const cost = new FormControl('', Validators.required);
    const location = new FormControl('', Validators.required);
    const date = new FormControl('', Validators.required);
    const hour = new FormControl('', Validators.required);
    this.eventForm = new FormGroup({
      name,
      description,
      cost,
      location,
      date,
      hour
    });
  }

  addEvent(formValues) {
    console.log(formValues);
    let event: Event = new Event();
    event = {...formValues};
    this.eventService.addEvent(formValues).subscribe(_event => {
      if (_event) {
        this.alertService.success('Se agregó Evento con éxito');
        this.router.navigate(['/admin/dashboard']);
      }
    }, error => {
      this.alertService.error(error.message);
    });
  }

  cancel() {
    this.router.navigate(['/admin/dashboard']);
  }
}
