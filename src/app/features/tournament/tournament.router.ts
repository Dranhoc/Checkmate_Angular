import { Routes } from '@angular/router';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { adminGuard } from '@core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'create',
    canActivate: [adminGuard],
    component: CreateTournamentComponent,
  },
];
