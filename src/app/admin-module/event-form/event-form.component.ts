import { Component, OnInit, OnDestroy } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// noinspection TypeScriptCheckImport
import {default as _rollupMoment, Moment} from 'moment';
import { EventsService, AlertService, DeviceTypeService } from '../../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../../_models';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ISubscription } from 'rxjs/Subscription';
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
export class EventFormComponent implements OnInit, OnDestroy {
  getSubscription: ISubscription;
  actionSubscription: ISubscription;
  dialogSubscription: ISubscription;

  innerWidth: any;
  isMobile: boolean;
  private dialogWidth: string;
  isLoading = false;

  eventForm: FormGroup;
  event: Event;
  id: string;
  date: FormControl;
  constructor(
    private eventService: EventsService,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private deviceTypeService: DeviceTypeService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.isMobile = this.deviceTypeService.isMobile();
    this.dialogWidth = this.isMobile ? '80%' : '50%';

    this.date = new FormControl('', Validators.required);
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cost: [''],
      location: ['', Validators.required],
      date: this.date,
      hour: ['', Validators.required]
    });
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isLoading = true;
      this.getSubscription = this.eventService.getEventById(this.id).subscribe(event => {
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
          this.date.setValue(this.event.date);
        }
      });
      this.isLoading = false;
    }
  }

  getDateErrorMessage() {
    return this.date.hasError('required') ?
      'Debes introducir una fecha válida, usa el ícono de calendario' : '';
  }

  addEvent(formValues) {
    this.isLoading = true;
    const isNewEvent = this.id === undefined;
    if (isNewEvent) {
      this.actionSubscription = this.eventService.addEvent(formValues).subscribe(_event => {
        if (_event) {
          this.alertService.success('Se agregó Evento con éxito');
          this.isLoading = false;
          this.router.navigate(['/admin/dashboard']);
        }
      });
    } else {
      this.actionSubscription = this.eventService.editEvent(formValues, this.id).subscribe(_event => {
        if (_event) {
          this.alertService.success('Se Modificó Evento con éxito');
          this.isLoading = false;
          this.router.navigate(['/admin/dashboard']);
        }
      });
    }
    this.isLoading = false;
  }

  cancel() {
    this.router.navigate(['/admin/dashboard']);
  }

  deleteEvent() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: this.dialogWidth,
      data: {
        title: 'Eliminar evento',
        action: 'eliminar',
        color: 'warn'
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.isLoading = true;
        this.actionSubscription = this.eventService.deleteEvent(this.id).subscribe(_ => {
            this.router.navigate(['/admin/dashboard']);
            this.alertService.success('Evento eliminado con éxito');
        }, error => {},
        () => this.isLoading = false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }
}
