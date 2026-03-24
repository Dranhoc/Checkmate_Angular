import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const connectedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isConnected = authService.isConnected;

  if (isConnected()) {
    return true;
  }

  router.navigate(['/', 'auth', 'login']);
  return false;
};
