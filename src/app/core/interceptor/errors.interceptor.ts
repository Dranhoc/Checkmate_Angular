import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse | Error) => {
      console.warn(error);
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
            authService.logout();
            router.navigate(['/', 'auth', 'login']);
            return throwError(() => null);
          case 500:
            router.navigate(['/']); //TODO page d'erreur 500
            return throwError(() => null);
        }
      }
      return throwError(() => error);
    }),
  );
};
