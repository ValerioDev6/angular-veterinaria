import { Routes } from '@angular/router';

export const STAFF_ROUTE: Routes = [
  {
    path: 'lista',
    loadComponent: () => import('./pages/staff-page/staff-page.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/update-staff/update-staff.component'),
  },
  {
    path: '**',
    redirectTo: 'lista',
  },
];
