import { Component, OnInit, OnDestroy } from '@angular/core';
import { periods, colors, generalOptions } from '../../_data/chart-data';
import { RecordService, ChartService } from '../../_services';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { RecordResponse, Stats, Record } from '../../_models';
import { tap } from 'rxjs/operators';
import { Chart } from 'chart.js';

import * as _moment from 'moment';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-comparasion-chart',
  templateUrl: './comparasion-chart.component.html',
  styleUrls: ['./comparasion-chart.component.css']
})
export class ComparasionChartComponent implements OnInit, OnDestroy {
  chart;
  data = {};
  options: Object;
  fecha;
  semana;

  colors: Object[];
  periods: Object[];
  selected = 'week';

  getSubscription: ISubscription;
  updateSubscription: ISubscription;

  currentRecords: Stats[];
  previousRecords: Stats[];

  constructor(
    private recordService: RecordService,
    private chartService: ChartService) {
    this.periods = [...periods];
    this.periods.shift();
    this.colors = [...colors];
    this.options = { ...generalOptions };
  }

  getRecords(): Observable<any> {
    const currentQuery = this.chartService.getPeriodQuery(this.selected);
    const previousQuery = this.chartService.getPeriodQuery(this.selected, 1);
    const currentCall = this.recordService.getRecords(currentQuery);
    const previousCall = this.recordService.getRecords(previousQuery);
    return forkJoin([currentCall, previousCall]).pipe(
      tap(results => {
        this.data = this.getDataSetsFromResponse(results[0], results[1]);
      }));
  }

  ngOnInit() {
    this.fecha = _moment();
    this.semana = this.weekOfMonth(this.fecha) + 1;
    this.getSubscription = this.getRecords().subscribe(_ => {
      this.chart = this.createChart(this.data);
    });
  }

  createChart(data: Object) {
    return new Chart('line-canvas', {
      type: 'line',
      data,
      options: {
        ...this.options,
        elements: {
        point: {
            radius: 6,
            hitRadius: 6,
            hoverRadius: 6
          }
        },
        scales: {
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

  updateChart(): void {
    this.updateSubscription = this.updateSubscription = this.getRecords().subscribe(_ => {
        this.chart.data = this.data;
        this.chart.update();
    });
  }

  private getDataSetsFromResponse(currentRecords: RecordResponse, previousRecords: RecordResponse): Object {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const weeks = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const datasets = [
      {
        label: 'Actual',
        data: null,
        backgroundColor: this.colors[0]['fill'],
      borderColor: this.colors[0]['border'],
      pointBackgroundColor: this.colors[0]['fill'],
      pointBorderColor: this.colors[0]['border'],
      pointBorderWidth: 2,
      pointHoverBackgroundColor: this.colors[0]['border'],
      }, {
        label: 'Anterior',
        data: null,
        backgroundColor: this.colors[1]['fill'],
        borderColor: this.colors[1]['border'],
        pointBackgroundColor: this.colors[1]['fill'],
        pointBorderColor: this.colors[1]['border'],
        pointBorderWidth: 2,
        pointHoverBackgroundColor: this.colors[1]['border'],
      }
    ];

    const data = {
      labels: null,
      datasets,
    };
    let operation;
    let length;

    function getDataset(records: Record[], arrResultLenght: number, dateOperation): number[] {
      const result = new Array(arrResultLenght).fill(0);
      records.forEach(record => {
        const date = _moment(record.fecha);
        const index = dateOperation(date);
        result[index] += 1;
      });
      return result;
    }

    switch (this.selected) {
      case 'week':
        data.labels = days;
        length = days.length;
        operation = (date: Date) => _moment(date).day();
        break;

      case 'month':
        data.labels = weeks;
        length = weeks.length;
        operation = (m) => (_moment(m).week() - _moment(m).startOf('month').week());
        break;

      case 'year':
        data.labels = months;
        length = months.length;
        operation = (date) => _moment(date).month();
        break;
    }
    datasets[0].data = getDataset(currentRecords.records, length, operation);
    datasets[1].data = getDataset(previousRecords.records, length, operation);
    return data;
  }

  private weekOfMonth(m): number {
    return m.week() - _moment(m).startOf('month').week();
  }

  private getDay(date: Date): number {
    return _moment(date).day();
  }

  private getMonth(date: Date): number {
    return _moment(date).month();
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
