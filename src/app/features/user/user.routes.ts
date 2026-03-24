import { Routes } from '@angular/router';
import { UserProfilePage } from './pages/user-profile-page/user-profile-page';

export const routes: Routes = [
  {
    path: 'profile',
    component: UserProfilePage,
  },
  {
    path: 'profile/edit',
    loadComponent: () =>
      import('./pages/edit-profile-page/edit-profile-page').then((c) => c.EditProfilePage),
  },
];
