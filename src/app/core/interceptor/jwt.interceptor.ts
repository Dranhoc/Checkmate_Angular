import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.authToken();

  if (token) {
    const reqClone = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + token),
    });
    return next(reqClone);
  }

  return next(req);
};
