import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkStatus().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        // Si ya está logueado → redirige al home
        router.navigateByUrl('/admin/home');
        return false;
      }
      // Si no está autenticado → deja entrar
      return true;
    })
  );
};

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkStatus().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        // Si no está logueado → redirige al login
        router.navigateByUrl('/auth/login');
        return false;
      }
      // Si está autenticado → deja entrar
      return true;
    })
  );
};
