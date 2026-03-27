import { Component, inject, signal } from '@angular/core';
import { Tournament } from '@core/models/tournament.interface';
import { AuthService } from '@core/services/auth.service';
import { TournamentService } from '@core/services/tournament.service';
import { UserService } from '@core/services/user.service';
import { TournamentCardComponent } from '@shared/components/tournament-card/tournament-card.component';

@Component({
  selector: 'app-home-page',
  imports: [TournamentCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  private readonly _tournamentService = inject(TournamentService);
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);

  protected readonly categories: Array<string> = this._tournamentService.getAllCategories();
  protected readonly status: Array<string> = this._tournamentService.getAllStatus();

  tournaments = signal<Array<Tournament>>([]);
  userId = this._authService.userId();
  userELO: number | null = null;

  async ngOnInit() {
    if (this.userId) {
      const user = await this._userService.getById(this.userId);
      this.userELO = user.data.elo;
    }
    this.tournaments.set(await this._tournamentService.getAll());
  }
}
