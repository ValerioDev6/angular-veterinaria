import { Routes } from '@angular/router';

export const CITAS_ROUTES: Routes = [
  {
    path: 'lista',
    loadComponent: () => import('./pages/citas-medicas-page/citas-medicas-page.component'),
  },

  {
    path: 'registrar',
    loadComponent: () => import('./pages/crear-cita-medica/crear-cita-medica.component'),
  },

  {
    path: ':id',
    loadComponent: () => import('./pages/update-cita-medica/update-cita-medica.component')
  },
  {
    path: '**',
    redirectTo: 'lista',
  },
];
