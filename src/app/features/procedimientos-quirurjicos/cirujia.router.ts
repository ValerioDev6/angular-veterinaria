import { Routes } from "@angular/router";


export const CIRUJIA_ROUTES: Routes = [
  {
    path: 'lista',
    loadComponent: () => import('./pages/procedimientos-page/procedimientos-page.component')
  },
  {
    path: 'registrar',
    loadComponent: () => import('./pages/create-cirugia/create-cirugia.component')
  }

]
