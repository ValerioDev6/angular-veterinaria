import { Routes } from '@angular/router';
import { permissionGuard } from '../auth/guard/permission.guard';
import { roleGuard } from '../auth/guard/role.guard';
import { IPERMISOS, RoleType } from '../auth/interfaces/auth_responser.interface';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('../../features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'roles',
        canActivate: [roleGuard, permissionGuard],
        data: {
          allowedRoles: [RoleType.ADMIN, RoleType.SUPER_ADMIN, RoleType.USER],
          permissions: [IPERMISOS.LIST_ROL],
        },
        loadChildren: () => import('../../features/roles/roles.route').then((m) => m.ROLES_ROUTE),
      },
      {
        path: 'users',
        canActivate: [roleGuard, permissionGuard],
        data: {
          allowedRoles: [RoleType.ADMIN, RoleType.SUPER_ADMIN, RoleType.USER],
          permissions: [IPERMISOS.LIST_STAFF],
        },
        loadChildren: () => import('../../features/staff/staff.route').then((m) => m.STAFF_ROUTE),
      },
      {
        path: 'veterinarios',
        loadChildren: () => import('../../features/veterinario/veterinario.routes').then((m) => m.VETERINARIO_ROUTES),
      },

      {
        path: 'mascotas',
        loadChildren: () => import('../../features/mascotas/mascota.routes').then((m) => m.MASCOTAS_ROUTES),
      },
      {
        path: 'citas-medicas',
        loadChildren: () => import('../../features/citas-medicas/citas.routes').then((m) => m.CITAS_ROUTES),
      },
      {
        path: 'calendario',
        loadChildren: () => import('../../features/calendario/calendario.routes').then((m) => m.CALENDARIO_ROUTES),
      },
      {
        path: 'vacunas',
        loadChildren: () => import('../../features/vacunas/vacunas.routes').then((m) => m.VACUNAS_ROUTES),
      },
      {
        path: 'cirujias',
        loadChildren: () =>
          import('../../features/procedimientos-quirurjicos/cirujia.router').then((m) => m.CIRUJIA_ROUTES),
      },
      {
        path: 'pagos',
        loadChildren: () => import('../../features/pagos/pagos.routes').then((m) => m.PAGOS_ROUTES),
      },
      {
        path: 'historial-medico',
        loadChildren: () => import('../../features/historial-medico/historial_medical.routes').then((m) => m.HISTORIAL_MEDICUAL_ROUTES),
      },
    ],
  },
];
