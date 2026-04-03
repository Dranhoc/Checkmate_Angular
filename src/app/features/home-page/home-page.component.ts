import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '@core/models/tournament.interface';
import { AuthService } from '@core/services/auth.service';
import { TournamentService } from '@core/services/tournament.service';
import { UserService } from '@core/services/user.service';
import { TournamentCardComponent } from '@shared/components/tournament-card/tournament-card.component';

@Component({
  selector: 'app-home-page',
  imports: [TournamentCardComponent, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  private readonly _router = inject(Router);
  private readonly _tournamentService = inject(TournamentService);
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  protected readonly categories: Array<string> = this._tournamentService.getAllCategories();
  protected readonly status: Array<string> = this._tournamentService.getAllStatus();

  tournaments = signal<Array<Tournament>>([]);
  tournamentsCanRegister = signal<Array<Tournament>>([]);
  tournamentsError = signal<string>('');

  userId = '';
  userELO: number | null = null;

  tournamentNameSearch: string | null = null;
  tournamentStatusFilter = '';
  tournamentCategoryFilter = '';
  tournamentEloFilter: number | null = null;
  tournamentEloFromFilter: number = 0;
  tournamentEloToFilter: number = 3000;
  tournamentCanRegisterFilter: boolean | null = null;

  async ngOnInit() {
    this.userId = this._authService.userId();
    if (this.userId) {
      this.tournamentsCanRegister.set(
        await this._tournamentService.getAll({ canRegister: 'true' }),
      );
      const user = await this._userService.getById(this.userId);
      this.userELO = user.data.elo;
    }

    this._activatedRoute.queryParams.subscribe({
      next: async (queryParams) => {
        try {
          this.tournaments.set(await this._tournamentService.getAll(queryParams));
        } catch (error) {
          const e = error as Error;
          this.tournamentsError.set(e?.message);
        }
      },
    });
  }

  clampValue(value: number): number {
    return Math.min(3000, Math.max(0, value));
  }

  onClickFilter() {
    this._router.navigate(['/'], {
      queryParams: {
        name: this.tournamentNameSearch,
        status: this.tournamentStatusFilter,
        category: this.tournamentCategoryFilter,
        elo: this.tournamentEloFilter,
        fromElo: this.tournamentEloFromFilter,
        toElo: this.tournamentEloToFilter,
        canRegister: this.tournamentCanRegisterFilter,
      },
    });
  }

  isFilterDisabled() {
    return this.tournamentEloFilter !== null;
  }
}
