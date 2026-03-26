import { DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tournament } from '@core/models/tournament.interface';
import { JoinPipe } from '@core/pipes/join.pipe';

@Component({
  selector: 'tournament-card',
  imports: [RouterLink, NgClass, JoinPipe, DatePipe],
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.css',
})
export class TournamentCardComponent {
  tournament = input.required<Tournament>();
  isRegistered(): boolean {
    return false;
  }
  isComplete(): boolean {
    if (this.tournament().max_player === this.tournament().min_player) {
      return true;
    }
    return false;
  }
}
