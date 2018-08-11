import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RecordService } from '../../_services';
import { Record, Stats, RecordResponse } from '../../_models';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

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

  constructor(private recordService: RecordService) {
    this.fillColors = FILL_COLORS;
    this.borderColors = BORDER_COLORS;
  }

  ngOnInit() {
    this.getRecords().subscribe(recordResponse => {
      this.chart = this.createChart(this.dataSets);
    });
  }

  getRecords(): Observable<RecordResponse> {
    return this.recordService.getRecords('limit=100&fields=user')
      .pipe(tap(recordResponse => {
        this.dataSets = this.getDataSetsFromResponse(recordResponse.stats);
    }));
  }

  updateChart(): void {
    this.getRecords().subscribe(_ => {
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
              beginAtZero: true
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
