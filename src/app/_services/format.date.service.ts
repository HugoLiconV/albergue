import {Injectable} from '@angular/core';

@Injectable()
export class FormatDateService {

  constructor() {
  }

  formatDate(date): string {
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
    const myDate = new Date(date);
    const day = myDate.getDate();
    const monthIndex = myDate.getMonth();
    const year = myDate.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
}
