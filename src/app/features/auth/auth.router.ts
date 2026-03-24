import { Routes } from '@angular/router';
import { AuthLoginPage } from './pages/auth-login-page/auth-login-page';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginPage,
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth-register-page/auth-register-page').then((c) => c.AuthRegisterPage),
  },
];
