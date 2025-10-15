import { Routes } from "@angular/router";



export const HISTORIAL_MEDICUAL_ROUTES: Routes = [
  {
    path: 'lista',
    loadComponent: () => import('./pages/historial-medico-page/historial-medico-page.component')
  }
]
