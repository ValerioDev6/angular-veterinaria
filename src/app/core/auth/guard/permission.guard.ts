import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/storage/local-storage.service';
import { IPERMISOS } from '../interfaces/auth_responser.interface';

export const permissionGuard: CanActivateFn = (route, _state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);

  const requiredPermissions: IPERMISOS[] = route.data['permissions'] || [];

  const user = authService.user;

  if (!user) {
    localStorageService.clear();
    location.reload();
    return router.createUrlTree(['/auth/login']);
  }

  if (requiredPermissions.length === 0 || authService.hasAnyPermission(requiredPermissions)) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
