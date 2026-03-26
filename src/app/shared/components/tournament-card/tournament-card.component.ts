import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tournament } from '@core/models/tournament.interface';
import { JoinPipe } from '@core/pipes/join.pipe';
import { AuthService } from '@core/services/auth.service';
import { TournamentService } from '@core/services/tournament.service';

@Component({
  selector: 'tournament-card',
  imports: [RouterLink, NgClass, JoinPipe, DatePipe],
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.css',
})
export class TournamentCardComponent {
  private readonly _tournamentService = inject(TournamentService);
  private readonly _authService = inject(AuthService);
  authUserId: string = this._authService.userId();

  tournament = input.required<Tournament>();

  isRegistered(): boolean {
    console.log('id : ', this.authUserId);

    const participants = this.tournament().participant;
    return Array.isArray(participants) && participants.some((p) => p.id === this.authUserId);
  }
  isComplete(): boolean {
    if (this.tournament().max_player === this.tournament().min_player) {
      return true;
    }
    return false;
  }
}
