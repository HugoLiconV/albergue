import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RecordService } from '../../_services';
import { Stats, RecordResponse } from '../../_models';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import * as _moment from 'moment';
import 'moment/locale/es';
import { PERIODS, COLORS } from '../../_data/chart-data';

_moment.locale('es');
@Component({
  selector: 'app-use-chart',
  templateUrl: './use-chart.component.html',
  styleUrls: ['./use-chart.component.css']
})
export class UseChartComponent implements OnInit {

  chart;
  dataSets = [];

  Colors: Object[];
  periods: Object[];
  selected = 'today';

  constructor(private recordService: RecordService) {
    this.Colors = COLORS;
    this.periods = PERIODS;
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
        maintainAspectRatio: false,
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
      const colorIndex = i % this.Colors.length;
      const dataSet = {
        label: record.user.name,
        data: [record.count],
        backgroundColor: this.Colors[colorIndex]['fill'],
        borderColor: this.Colors[colorIndex]['border'],
        borderWidth: 1
      };
      data.push(dataSet);
      return data;
    }, []);
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
