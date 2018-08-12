import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RecordService } from '../../_services';
import {  Stats, RecordResponse } from '../../_models';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import * as _moment from 'moment';
import 'moment/locale/es';

_moment.locale('es');
@Component({
  selector: 'app-use-chart',
  templateUrl: './use-chart.component.html',
  styleUrls: ['./use-chart.component.css']
})
export class UseChartComponent implements OnInit {

  chart;
  fillColors: string[];
  borderColors: string[];
  dataSets = [];

  periods = [
    {value: 'today', viewValue: 'Hoy'},
    {value: 'week', viewValue: 'Semana'},
    {value: 'month', viewValue: 'Mes'},
    {value: 'year', viewValue: 'Año'}
  ];
  selected = 'today';

  constructor(private recordService: RecordService) {
    this.fillColors = FILL_COLORS;
    this.borderColors = BORDER_COLORS;
  }

  ngOnInit() {
    const query = this.getPeriodQuery(this.selected);
    this.getRecords(query).subscribe(_ => {
      this.chart = this.createChart(this.dataSets);
    });
  }

  getRecords(query = ''): Observable<RecordResponse> {
    return this.recordService.getRecords(query)
      .pipe(tap(recordResponse => {
        this.dataSets = this.getDataSetsFromResponse(recordResponse.stats);
    }));
  }

  updateChart(query: string): void {
    console.log(query);
    this.getRecords(query).subscribe(_ => {
        this.chart.data.datasets = this.dataSets;
        this.chart.update();
    });
  }

  createChart(dataSets: Object[]) {
    return new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Hoy'],
        datasets: dataSets
      },
      options: {
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

  private getDataSetsFromResponse(records: Stats[]): Object[] {
    return records.reduce((data, record, i) => {
      const colorIndex = i % FILL_COLORS.length;
      const dataSet = {
        label: record.user.name,
        data: [record.count],
        backgroundColor: FILL_COLORS[colorIndex],
        borderColor: BORDER_COLORS[colorIndex],
        borderWidth: 1
      };
      data.push(dataSet);
      return data;
    }, []);
  }

  periodSelectorChange(period) {
    let label: string;
    this.periods.forEach(_period => {
      if (_period.value === period) {
       label = _period.viewValue;
       return;
      }
    });
    this.chart.data.labels = [label];
    this.updateChart(this.getPeriodQuery(period));
  }

  getPeriodQuery(period) {
    let startDate;
    let endDate;
    let query: QueryBuilder;
    switch (period) {
      case 'today':
        startDate = _moment().startOf('day').toISOString();
        endDate   = _moment().endOf('day').toISOString();
        break;

      case 'week':
        startDate = _moment().startOf('week').toISOString();
        endDate   = _moment().endOf('week').toISOString();
        break;

      case 'month':
        startDate = _moment().startOf('month').toISOString();
        endDate   = _moment().endOf('month').toISOString();
        break;

      case 'year':
        startDate = _moment().startOf('year').toISOString();
        endDate   = _moment().endOf('year').toISOString();
        break;
    }
    query = new QueryBuilder.Builder().afterDate(startDate).beforeDate(endDate).build();
    return query.getQuery();
  }

}

export const FILL_COLORS: string[] = [
  'rgba(243, 58, 48, 0.2)',
  'rgba(233, 30, 99, 0.2)',
  'rgba(106, 27, 154, 0.2)',
  'rgba(55, 72, 172, 0.2)',
  'rgba(29, 139, 241, 0.2)',
  'rgba(0, 139, 125, 0.2)',
  'rgba(255, 185, 13, 0.2)',
  'rgba(255, 76, 32, 0.2)',
  'rgba(148, 148, 148, 0.2)',
  'rgba(91, 50, 173, 0.2)'
];

export const BORDER_COLORS: string[] = [
  'rgba(243, 58, 48, 1)',
  'rgba(233, 30, 99, 1)',
  'rgba(106, 27, 154, 1)',
  'rgba(55, 72, 172, 1)',
  'rgba(29, 139, 241, 1)',
  'rgba(0, 139, 125, 1)',
  'rgba(255, 185, 13, 1)',
  'rgba(255, 76, 32, 1)',
  'rgba(148, 148, 148, 1)',
  'rgba(91, 50, 173, 1)'
];
export class QueryBuilder {
  before: string;
  after: string;
  constructor(build) {
    this.before = build.before;
    this.after = build.after;
  }
  getQuery(): string {
    let query = '';
    query += this.before ? `before=${this.before}&` : '';
    query += this.after ? `after=${this.after}&` : '';
    return query;
  }
   static get Builder() {
    class Builder {
      private before;
      private after;

      beforeDate(date: Date) {
        this.before = date;
        return this;
      }
      afterDate(date: Date) {
        this.after = date;
        return this;
      }
      build() {
        return new QueryBuilder(this);
      }
    }
    return Builder;
  }
}
