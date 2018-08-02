export class Event {
  id?: number;
  name: string;
  description: string;
  location: string;
  date: Date;
  hour: string;
  cost?: number;
}


/*
"	Nombre: Título del evento que se llevará a cabo.
"	Descripción: Descripción del evento y detalles del evento.
"	Lugar: Ubicación donde se llevará a cabo el evento, se mostrará la dirección y un mapa.
"	Fecha y hora: Día y hora en que se realizará el evento.
"	Costo: Se mostrará si el evento tiene costo o si es gratuito.
*/
