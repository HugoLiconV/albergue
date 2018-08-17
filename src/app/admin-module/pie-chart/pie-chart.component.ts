import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { RecordService } from '../../_services';
import { Stats, RecordResponse } from '../../_models';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import * as _moment from 'moment';
import 'moment/locale/es';
import { PERIODS, COLORS } from '../../_data/chart-data';
import { QueryBuilder } from '../use-chart/use-chart.component';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnDestroy {
  chart;
  data = {};

  colors: Object[];
  periods: Object[];
  selected = 'today';

  getSubscription: ISubscription;
  updateSubscription: ISubscription;

  constructor(private recordService: RecordService) {
    this.periods = PERIODS;
    this.colors = COLORS;
  }

  getRecords(query = ''): Observable < RecordResponse > {
    return this.recordService.getRecords(query)
      .pipe(tap(recordResponse => {
        this.data = this.getDataSetsFromResponse(recordResponse.stats);
      }));
  }

  ngOnInit() {
    const query = this.getPeriodQuery(this.selected);
    this.getSubscription = this.getRecords(query).subscribe(_ => {
      this.chart = this.createChart(this.data);
    });
  }

  createChart(data: Object) {
    return new Chart('pie-canvas', {
      type: 'doughnut',
      data,
      options: {
        maintainAspectRatio: false,
      }
    });
  }

  updateChart(query: string): void {
    this.updateSubscription = this.getRecords(query).subscribe(_ => {
        this.chart.data = this.data;
        this.chart.update();
    });
  }

  private getDataSetsFromResponse(records: Stats[]): Object {
    if (records.length === 0) {
      return { labels: [], datasets: [] };
    }
    const data = {
      labels: [],
      datasets: [{
        labels: [],
        data: [],
        backgroundColor: [],
        borderColor: [],
      }]
    };
    console.log(records);
    records.map((record, i) => {
      const colorIndex = i % this.colors.length;
      data.labels.push(record.user.name);
      data.datasets[0]['data'].push(record.count);
      data.datasets[0]['backgroundColor'].push(this.colors[colorIndex]['fill']);
      data.datasets[0]['borderColor'].push(this.colors[colorIndex]['border']);
    });
    console.log(data);

    return data;
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

  ngOnDestroy(): void {
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
