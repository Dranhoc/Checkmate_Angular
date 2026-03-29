import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tournament } from '@core/models/tournament.interface';
import { JoinPipe } from '@core/pipes/join.pipe';
import { AuthService } from '@core/services/auth.service';
import { TournamentService } from '@core/services/tournament.service';
import { RouterButtonComponent } from '../router-button/router-button.component';
import { TournamentStatusCard } from '@core/enums/status.enum';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'tournament-card',
  imports: [RouterLink, JoinPipe, DatePipe, RouterButtonComponent, SvgIconComponent],
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.css',
})
export class TournamentCardComponent {
  private readonly _tournamentService = inject(TournamentService);
  private readonly _authService = inject(AuthService);
  protected readonly TournamentStatusCard = TournamentStatusCard;

  authUserId: string = this._authService.userId();
  tournament = input.required<Tournament>();
  tournamentCanRegister = input<Array<Tournament>>();

  isRegistered(): boolean {
    console.log('id : ', this.authUserId);

    const participants = this.tournament().participant;
    return Array.isArray(participants) && participants.some((p) => p.id === this.authUserId);
  }
  isComplete(): boolean {
    return this.tournament().max_player <= this.tournament().participantsCount;
  }

  canRegister(): boolean | undefined {
    return this.tournamentCanRegister()?.some(
      (tournament) => tournament.id === this.tournament().id,
    );
  }
}
