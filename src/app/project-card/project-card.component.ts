import { Component, OnInit } from '@angular/core';
import { PROJECTS } from '../../mock-project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  projects = PROJECTS;
  // project = this.projects[0];
  tiles = [
    { text: 'One', cols: 2, rows: 2, color: 'lightblue' },
    { text: 'Two', cols: 2, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 2, rows: 2, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 2, color: '#DDBDF1' }
  ];
  constructor() {}

  ngOnInit() {}

  formatDate(date) {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Deciembre'
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
}
