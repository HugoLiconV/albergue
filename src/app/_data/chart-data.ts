function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export const PERIODS: Object[] = [{
    value: 'today',
    viewValue: 'Hoy'
  },
  {
    value: 'week',
    viewValue: 'Semana'
  },
  {
    value: 'month',
    viewValue: 'Mes'
  },
  {
    value: 'year',
    viewValue: 'Año'
  }
];

export const COLORS: string[] = shuffle([{
    fill: 'rgba(243, 58, 48, 0.2)',
    border: 'rgba(243, 58, 48, 1)',
  },
  {
    fill: 'rgba(233, 30, 99, 0.2)',
    border: 'rgba(233, 30, 99, 1)',
  },
  {
    fill: 'rgba(106, 27, 154, 0.2)',
    border: 'rgba(106, 27, 154, 1)',
  },
  {
    fill: 'rgba(55, 72, 172, 0.2)',
    border: 'rgba(55, 72, 172, 1)',
  },
  {
    fill: 'rgba(29, 139, 241, 0.2)',
    border: 'rgba(29, 139, 241, 1)',
  },
  {
    fill: 'rgba(0, 139, 125, 0.2)',
    border: 'rgba(0, 139, 125, 1)',
  },
  {
    fill: 'rgba(255, 185, 13, 0.2)',
    border: 'rgba(255, 185, 13, 1)',
  },
  {
    fill: 'rgba(255, 76, 32, 0.2)',
    border: 'rgba(255, 76, 32, 1)',
  },
  {
    fill: 'rgba(148, 148, 148, 0.2)',
    border: 'rgba(148, 148, 148, 1)',
  },
  {
    fill: 'rgba(91, 50, 173, 0.2)',
    border: 'rgba(91, 50, 173, 1)'
  },
]);
