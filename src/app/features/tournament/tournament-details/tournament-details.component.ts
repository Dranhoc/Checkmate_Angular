import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@core/models/api.interface';
import { Tournament } from '@core/models/tournament.interface';
import { AuthService } from '@core/services/auth.service';
import { TournamentService } from '@core/services/tournament.service';
import { TournamentCardComponent } from '@shared/components/tournament-card/tournament-card.component';

@Component({
  selector: 'tournament-details',
  imports: [TournamentCardComponent],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.css',
})
export class TournamentDetailsComponent {
  private readonly _tournamentService = inject(TournamentService);
  private readonly _authService = inject(AuthService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  tournamentsError = signal<string>('');
  tournament = signal<Tournament | undefined>(undefined);
  tournamentCanRegister = signal<boolean | undefined>(undefined);

  userId = '';
  tournamentId: string | null = this._activatedRoute.snapshot.paramMap.get('id');

  async ngOnInit() {
    this.userId = this._authService.userId();
    if (this.tournamentId) {
      this.tournament.set(await this._tournamentService.getById(+this.tournamentId));

      if (this.userId) {
        const canRegister = await this._tournamentService.canRegister(
          +this.tournamentId,
          this.userId,
        );
        this.tournamentCanRegister.set(canRegister);
      }
    }
  }
  async onRefresh() {
    this.tournamentCanRegister.set(
      await this._tournamentService.canRegister(+this.tournamentId!, this.userId),
    );
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.tournament.set(await this._tournamentService.getById(+id));
    }
  }
}
