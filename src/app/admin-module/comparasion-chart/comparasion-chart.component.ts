import { Component, OnInit, OnDestroy } from '@angular/core';
import { PERIODS, COLORS } from '../../_data/chart-data';
import { RecordService } from '../../_services';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { RecordResponse, Stats } from '../../_models';
import { tap } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { QueryBuilder } from '../use-chart/use-chart.component';
import * as _moment from 'moment';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-comparasion-chart',
  templateUrl: './comparasion-chart.component.html',
  styleUrls: ['./comparasion-chart.component.css']
})
export class ComparasionChartComponent implements OnInit, OnDestroy {
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  weeks = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  chart;
  data = {};

  colors: Object[];
  periods: Object[];
  selected = 'week';

  getSubscription: ISubscription;
  updateSubscription: ISubscription;

  currentRecords: Stats[];
  previousRecords: Stats[];

  constructor(private recordService: RecordService) {
    this.periods = [...PERIODS];
    this.periods.shift();
    this.colors = COLORS;
  }

  getRecords(query = ''): Observable<any> {
    const currentQuery = this.getPeriodQuery(this.selected);
    const previousQuery = this.getPeriodQuery(this.selected, 1);
    const currentCall = this.recordService.getRecords(currentQuery);
    const previousCall = this.recordService.getRecords(previousQuery);
    return forkJoin([currentCall, previousCall]).pipe(
      tap(results => {
        this.data = this.getDataSetsFromResponse(results[0], results[1]);
        console.log(results);
      }));
  }

  ngOnInit() {
    this.getRecords().subscribe(_ => {
      this.chart = this.createChart(this.data);
    });
  }

  createChart(data: Object) {
    return new Chart('line-canvas', {
      type: 'line',
      labels: this.months,
      data,
      options: {
        maintainAspectRatio: false,
        scales: {
          // xAxes: [{
          //   type: 'time',
          //   time: {
          //     unit: 'day'
          //   }
          // }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        },
      }
    });
  }

  updateChart(query: string): void {
    this.updateSubscription = this.getRecords(query).subscribe(_ => {
        this.chart.data = this.data;
        this.chart.update();
    });
  }

  private getDataSetsFromResponse(currentRecords: RecordResponse, previousRecords: RecordResponse): Object {
    console.log(this.selected);
    const datasets = [
      {
      label: 'Actual',
      data: null,
      backgroundColor: this.colors[0]['fill'],
      borderColor: this.colors[0]['border']
      }, {
      label: 'Anterior',
      data: null,
      backgroundColor: this.colors[1]['fill'],
      borderColor: this.colors[1]['border']
      }
    ];

    const data = {
      labels: null,
      datasets,
    };
    let current;
    let previous;
    switch (this.selected) {
      case 'today':
        break;

      case 'week':
        data.labels = this.days;
        current = new Array(7).fill(0);
        previous = new Array(7).fill(0);
        currentRecords.records.forEach(record => {
          const date = _moment(record.fecha);
          const dayIndex = date.day();
          current[dayIndex] += 1;
        });
        previousRecords.records.forEach(record => {
          const date = _moment(record.fecha);
          const dayIndex = date.day();
          previous[dayIndex] += 1;
        });
        break;

      case 'month':
        data.labels = this.weeks;
        current = new Array(4).fill(0);
        previous = new Array(4).fill(0);
        currentRecords.records.forEach(record => {
          const date = _moment(record.fecha);
          const weekIndex = this.weekOfMonth(date);
          current[weekIndex] += 1;
        });
        previousRecords.records.forEach(record => {
          const date = _moment(record.fecha);
          const weekIndex = this.weekOfMonth(date);
          previous[weekIndex] += 1;
        });
        break;

      case 'year':
        data.labels = this.months;
        current = new Array(12).fill(0);
        previous = new Array(12).fill(0);
        currentRecords.records.forEach(record => {
          const date = _moment(record.fecha);
          const index = date.month();
          current[index] += 1;
        });
        previousRecords.records.forEach(record => {
          const date = _moment(record.fecha);
          const index = date.month();
          console.log(index);
          previous[index] += 1;
        });
        break;
    }
    datasets[0].data = current;
    datasets[1].data = previous;
    return data;
  }

  private weekOfMonth(m) {
    return m.week() - _moment(m).startOf('month').week() + 1;
  }

  periodSelectorChange(period) {
    let label: string;
    this.periods.forEach(_period => {
      if (_period['value'] === period) {
       label = _period['viewValue'];
       return;
      }
    });
    this.chart.data.labels = [label];
    this.updateChart(this.getPeriodQuery(period));
  }

  getPeriodQuery(period, previous = 0) {
    let startDate;
    let endDate;
    let query: QueryBuilder;
    switch (period) {
      case 'today':
        startDate = _moment().subtract(previous, 'days').startOf('day').toISOString();
        endDate   = _moment().subtract(previous, 'days').endOf('day').toISOString();
        break;

      case 'week':
        startDate = _moment().subtract(previous, 'weeks').startOf('week').toISOString();
        endDate   = _moment().subtract(previous, 'weeks').endOf('week').toISOString();
        break;

      case 'month':
        startDate = _moment().subtract(previous, 'months').startOf('month').toISOString();
        endDate   = _moment().subtract(previous, 'months').endOf('month').toISOString();
        break;

      case 'year':
        startDate = _moment().subtract(previous, 'years').startOf('year').toISOString();
        endDate   = _moment().subtract(previous, 'years').endOf('year').toISOString();
        break;
    }
    query = new QueryBuilder.Builder().afterDate(startDate).beforeDate(endDate).build();
    return query.getQuery();
  }

  ngOnDestroy(): void {
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
