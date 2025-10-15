import { Routes } from '@angular/router';

export const CALENDARIO_ROUTES: Routes = [
  {
    path: 'lista',
    loadComponent: () =>
      import('./pages/calendario-page/calendario-page.component').then((m) => m.CalendarioPageComponent),
  },
];
