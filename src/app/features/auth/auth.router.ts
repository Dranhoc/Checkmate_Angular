import { Routes } from '@angular/router';
import { AuthLoginPage } from './pages/auth-login-page/auth-login-page';
import { notConnectedGuard } from '@core/guards/not-connected';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [notConnectedGuard],
    component: AuthLoginPage,
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth-register-page/auth-register-page').then((c) => c.AuthRegisterPage),
  },
];
