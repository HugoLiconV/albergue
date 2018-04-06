import { Component, ViewChild, AfterViewChecked, AfterViewInit } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { PROJECTS } from '../../mock-project';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements AfterViewInit {
  projects = PROJECTS;

  displayedColumns = ['nombre', 'descripcion', 'fechaPublicacion', 'numPersonas', 'area'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

export interface Element {
  id: number;
  nombre: string;
  descripcion: string;
  fechaPublicacion: Date;
  numPersonas: number;
  solucion: string;
  area: string;
}

const ELEMENT_DATA: Element[] = [
{
  id: 1,
  nombre: 'Control de acceso',
  descripcion: 'Se necesita un control de acceso para controlar el uso de lavadoras',
  fechaPublicacion: new Date(),
  numPersonas: 4,
  solucion: 'Crear un control de acceso con arduino',
  area: 'Electrónica, Sistemas',
  },
  {
  id: 2,
  nombre: 'consequuntur inventore ab',
  descripcion: `Vel sit id consequatur. Illo et quibusdam optio culpa culpa enim
   error. In consectetur et provident pariatur. Et consequuntur minus ut quos.`,
  fechaPublicacion: new Date(),
  numPersonas: 3,
  solucion: `Aut impedit et totam sunt. Et doloribus minus sit. Facere fuga quo
  eveniet distinctio labore aliquid `,
  area: 'Electrónica, Sistemas',
  },
  {
  id: 3,
  nombre: 'consequuntur inventore ab',
  descripcion: `Vel sit id consequatur. Illo et quibusdam optio culpa culpa enim
   error. In consectetur et provident pariatur. Et consequuntur minus ut quos.`,
  fechaPublicacion: new Date(),
  numPersonas: 3,
  solucion: `Aut impedit et totam sunt. Et doloribus minus sit. Facere fuga quo
  eveniet distinctio labore aliquid`,
  area: 'Electrónica, Sistemas'
  }, {
  id: 4,
  nombre: 'consequuntur inventore ab',
  descripcion: `Vel sit id consequatur. Illo et quibusdam optio culpa culpa enim
   error. In consectetur et provident pariatur. Et consequuntur minus ut quos.`,
  fechaPublicacion: new Date(),
  numPersonas: 3,
  solucion: `Aut impedit et totam sunt. Et doloribus minus sit. Facere fuga quo
  eveniet distinctio labore aliquid`,
  area: 'Electrónica, Sistemas'
  }
];
