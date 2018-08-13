import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chartType: ChartTypes;
  chart;
  @Input() dataSets: Object[];
  @Input() options: Object;
  @Input() set type(type: ChartTypes) {
    if (!Object.values(ChartTypes).includes(type)) {
      try {
        throw new Error('Tipo de chart Invalido');
      } catch (e) {
        console.error(e);
        const keys = Object.keys(ChartTypes).filter(k => typeof ChartTypes[k as any] === 'string');
        console.error(`Valores válidos: ${keys}`);
      }
    } else {
      this.chartType = type;
    }
  }

  constructor() { }

  ngOnInit() {
    // const lineOptions = {
    //     maintainAspectRatio: false,
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true,
    //           stepSize: 1
    //         }
    //       }]
    //     },
    // };
    this.chart = this.createChart(this.chartType, this.dataSets);
  }

  createChart(type: string, dataSets: Object[], options = { maintainAspectRatio: false }) {
    return new Chart('canvas', {
      type,
      data: {
        labels: ['Hoy'],
        datasets: dataSets
      },
      options
    });
  }
}

export enum ChartTypes {
  line = 'line',
  bar = 'bar',
  radar = 'radar',
  pie = 'pie',
  doughnut = 'doughnut',
  polarArea = 'polarArea',
  bubble = 'bubble',
  scatter = 'scatter',
}
