import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { RecordService, ChartService } from '../../_services';
import { Stats, RecordResponse } from '../../_models';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import * as _moment from 'moment';
import 'moment/locale/es';
import { PERIODS, COLORS } from '../../_data/chart-data';
import { ISubscription } from 'rxjs/Subscription';

_moment.locale('es');
@Component({
  selector: 'app-use-chart',
  templateUrl: './use-chart.component.html',
  styleUrls: ['./use-chart.component.css']
})
export class UseChartComponent implements OnInit, OnDestroy {

  chart;
  data: Object;

  Colors: Object[];
  periods: Object[];
  selected = 'today';

  getSubscription: ISubscription;
  updateSubscription: ISubscription;

  constructor(
    private recordService: RecordService,
    private chartService: ChartService) {
    this.Colors = [...COLORS];
    this.periods = [...PERIODS];
  }

  ngOnInit() {
    const query = this.chartService.getPeriodQuery(this.selected);
    this.getSubscription = this.getRecords(query).subscribe(_ => {
      this.chart = this.createChart(this.data);
    });
  }

  getRecords(query = ''): Observable<RecordResponse> {
    return this.recordService.getRecords(query)
      .pipe(tap(recordResponse => {
        this.data = this.getDataSetsFromResponse(recordResponse.stats);
    }));
  }

  updateChart(): void {
    const query = this.chartService.getPeriodQuery(this.selected);
    this.updateSubscription = this.getRecords(query).subscribe(_ => {
        this.chart.data = this.data;
        this.chart.update();
    });
  }

  createChart(data: Object) {
    return new Chart('canvas', {
      type: 'bar',
      data,
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

  private getDataSetsFromResponse(records: Stats[]): Object {
    const datasets = records.reduce((data, record, i) => {
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
    return {
        labels: this.getLabel(this.selected),
        datasets
    };
  }

  private getLabel(period): string[] {
    let label: string[];
    this.periods.forEach(_period => {
      if (_period['value'] === period) {
        label = [_period['viewValue']];
        return;
      }
    });
    return label;
  }
  periodSelectorChange(period) {
    this.chart.data.labels = this.getLabel(period);
    this.updateChart();
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
