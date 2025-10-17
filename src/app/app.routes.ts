import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard, loginGuard } from './core/auth/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  {
    path: 'admin',
    canActivate: [loginGuard],
    loadChildren: () => import('./core/layout/layout.route').then((m) => m.ADMIN_ROUTES),
  },

  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
