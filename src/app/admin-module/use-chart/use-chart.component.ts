import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RecordService } from '../../_services';
import { Record } from '../../_models';
import { map, concatMap, switchMap, mergeMap } from 'rxjs/operators';
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
  dataSet = [];

  constructor(private recordService: RecordService) {
    this.fillColors = FILL_COLORS;
    this.borderColors = BORDER_COLORS;
  }

  getRecords(): Observable<Record[]> {
    return this.recordService.getRecords('limit=100&fields=user')
      .pipe(
        map(records => {
          this.dataSet = this.getRecordCount(records);
          console.log('pipe');
          console.log(this.dataSet);
          // this.updateChart();
          return records;
        })
      );
  }

  private getRecordCount(records: Record[]): Object[] {
    const result = records.reduce((objSum, record) => {
    const id = record.user.id;
      if (!objSum[id]) {
        objSum[id] = {
          count: 1,
          name: record.user.name
        };
      } else {
        objSum[id].count += 1;
      }
      return objSum;
    }, {});

    const arrayData = Object.keys(result).reduce((arr, key, i) => {
      const record = result[key];
      const colorIndex = i % FILL_COLORS.length;
      const dataSet = {
        label: record.name,
        data: [record.count],
        backgroundColor: FILL_COLORS[colorIndex],
        borderColor: BORDER_COLORS[colorIndex],
        borderWidth: 1
      };
      arr.push(dataSet);
      return arr;
    }, []);
    return arrayData;
  }

  updateChart(): void {
    this.chart.data.datasets = this.dataSet;
  }

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Hoy'],
        datasets: []
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
    this.getRecords();
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
