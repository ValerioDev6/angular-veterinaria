import { Routes } from "@angular/router";

export const PAGOS_ROUTES: Routes = [
  {
    path: 'lista',
    loadComponent: () => import('./pages/pagos-page/pagos-page.component').then((m) => m.PagosPageComponent)
  }
]
