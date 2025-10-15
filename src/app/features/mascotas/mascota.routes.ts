import { Routes } from '@angular/router';

export const MASCOTAS_ROUTES: Routes = [
  {
    path: 'lista',
    loadComponent: () => import('./pages/mascota-page/mascota-page.component'),
  },
  {
    path: 'registrar',
    loadComponent: () =>
      import('./pages/create-paciente/create-paciente.component'),
  },

  {
    path: ':id',
    loadComponent: () => import('./pages/update-paciente/update-paciente.component'),
  },
  {
    path: '**',
    redirectTo: 'lista',
  },
];
