import { Routes } from '@angular/router';

export const VETERINARIO_ROUTES: Routes = [
  {
    path: 'lista',
    loadComponent: () =>
      import('./pages/veterinario-page/veterinario-page.component').then((m) => m.VeterinarioPageComponent),
  },
  {
    path: 'registrar',
    loadComponent: () =>
      import('./pages/create-veterinario/create-veterinario.component').then((m) => m.CreateVeterinarioComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/update-veterinario/update-veterinario.component').then((m) => m.UpdateVeterinarioComponent),
  },
];
