import { Routes } from "@angular/router";

export const VACUNAS_ROUTES: Routes = [

  {
    path: 'lista',
    loadComponent: () => import('./pages/vacunas-page/vacunas-page.component')
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/create-vacuna/create-vacuna.component')
  }

]
