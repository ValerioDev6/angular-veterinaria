import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleType } from '../interfaces/auth_responser.interface';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/storage/local-storage.service';

export const roleGuard: CanActivateFn = (route, _state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);

  const allowedRoles: RoleType[] = route.data['allowedRoles'] || [];

  // Obtener el usuario actual del signal
  const user = authService.user;

  // Si no hay usuario
  if (!user) {
    localStorageService.clear();
    location.reload();
    return router.createUrlTree(['/auth/login']);
  }

  // Verificar si el rol del usuario está en los roles permitidos
  if (allowedRoles.length === 0 || allowedRoles.includes(user.role as RoleType)) {
    return true;
  }

  // Usuario no tiene el rol permitido
  return router.createUrlTree(['/unauthorized']);
};
