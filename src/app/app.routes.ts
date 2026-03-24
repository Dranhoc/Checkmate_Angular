import { Routes } from '@angular/router';
// import { Error404Component } from './features/error/error404/error404.component';
// import { connectedGuard } from '@core/guards/connected.guard';
// import { adminGuard } from '@core/guards/admin.guard';
import { HomePageComponent } from './features/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./features/auth/auth.router').then((r) => r.routes),
  // },
  // {
  //   path: 'user',
  //   // canActivate: [connectedGuard],
  //   loadChildren: () => import('./features/user/user.routes').then((r) => r.routes),
  // },
  // {
  //   path: '**',
  //   component: Error404Component,
  // },
];
