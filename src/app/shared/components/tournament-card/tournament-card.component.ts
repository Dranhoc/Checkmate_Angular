import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tournament } from '@core/models/tournament.interface';
import { JoinPipe } from '@core/pipes/join.pipe';
import { AuthService } from '@core/services/auth.service';
import { RouterButtonComponent } from '../router-button/router-button.component';
import { TournamentStatusCard } from '@core/enums/status.enum';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { TournamentService } from '@core/services/tournament.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '@core/models/api.interface';

@Component({
  selector: 'tournament-card',
  imports: [RouterLink, JoinPipe, DatePipe, RouterButtonComponent, SvgIconComponent, NgClass],
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.css',
})
export class TournamentCardComponent {
  private readonly _authService = inject(AuthService);
  private readonly _tournamentService = inject(TournamentService);
  protected readonly TournamentStatusCard = TournamentStatusCard;

  authUserId: string = this._authService.userId();
  isAdmin: boolean | null = this._authService.isAdmin();
  tournament = input.required<Tournament>();
  tournamentsCanRegister = input<Array<Tournament>>();
  tournamentCanRegister = input<boolean>();
  detailsPage = input<boolean>();
  startError = signal('');
  refreshNeeded = output();

  isRegistered(): boolean {
    const participants = this.tournament().participant;
    return Array.isArray(participants) && participants.some((p) => p.id === this.authUserId);
  }
  isComplete(): boolean {
    return this.tournament().max_player <= this.tournament().participantsCount;
  }

  canRegister(): boolean | undefined {
    if (this.tournamentCanRegister() !== undefined) {
      return this.tournamentCanRegister();
    }
    return this.tournamentsCanRegister()?.some(
      (tournament) => tournament.id === this.tournament().id,
    );
  }
  async startTournament() {
    try {
      await this._tournamentService.start(this.tournament().id);
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        this.startError.set(err.error.message);
      }
    }
  }
  async nextRound() {
    try {
      await this._tournamentService.nextRound(this.tournament().id);
      this.refreshNeeded.emit();
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        this.startError.set(err.error.message);
      }
    }
  }
}
