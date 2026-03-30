import { Routes } from '@angular/router';
import { adminGuard } from '@core/guards/admin.guard';
import { connectedGuard } from '@core/guards/connected.guard';

export const routes: Routes = [
  {
    path: 'create',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./create-tournament/create-tournament.component').then(
        (c) => c.CreateTournamentComponent,
      ),
  },
  {
    path: ':id',
    canActivate: [connectedGuard],
    loadComponent: () =>
      import('./tournament-details/tournament-details.component').then(
        (c) => c.TournamentDetailsComponent,
      ),
  },
];
