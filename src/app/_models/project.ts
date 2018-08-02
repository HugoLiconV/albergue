export class Project {
  id?: number;
  name: string;
  description: string;
  publicationDate: Date;
  numberOfPeople?: number;
  solution?: string;
  area: string;

  constructor() {
    this.publicationDate = new Date();
  }
}

/*
"	Nombre: Título del proyecto.
"	Descripción: Descripción del problema que se busca solucionar con el proyecto.
"	Fecha de publicación: Fecha en la que fue publicado el proyecto en la página.
"	Número de personas. Cantidad de personas que se necesitan para llevar a cabo el proyecto.
"	Solución: Se explicará cómo se tiene pensado solucionar el problema.
"	Área: Área al que va dirigido el proyecto.
"	Resumen de solución: Breve explicación de cómo se piensa solucionar el problema, se mostrará solo en las cartas de la página principal.
*/
