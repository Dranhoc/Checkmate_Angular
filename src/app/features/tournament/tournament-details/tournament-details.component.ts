import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '@core/enums/status.enum';
import { Tournament } from '@core/models/tournament.interface';
import { AuthService } from '@core/services/auth.service';
import { TournamentService } from '@core/services/tournament.service';
import { UserService } from '@core/services/user.service';
import { TournamentCardComponent } from '@shared/components/tournament-card/tournament-card.component';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

@Component({
  selector: 'tournament-details',
  imports: [TournamentCardComponent, NgClass],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.css',
})
export class TournamentDetailsComponent {
  private readonly _tournamentService = inject(TournamentService);
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  tournamentId: string | null = this._activatedRoute.snapshot.paramMap.get('id');
  tournamentsError = signal<string>('');
  tournament = signal<Tournament | undefined>(undefined);
  tournamentCanRegister = signal<boolean | undefined>(undefined);
  updateTime = signal<number>(0);
  isAdmin = signal<boolean>(true);
  errorUpdate = signal({ id: 0, message: '' });

  userId = '';

  async ngOnInit() {
    console.log('ngOnInit');
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
    this.setUpdateTime();
    await this.getResult();
  }

  async onRefresh() {
    this.tournamentCanRegister.set(
      await this._tournamentService.canRegister(+this.tournamentId!, this.userId),
    );
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.tournament.set(await this._tournamentService.getById(+id));
    }

    await this.getResult();
  }
  getAge(birthDate: string | Date): number {
    return dayjs().diff(dayjs(birthDate), 'year');
  }

  async getResult() {
    const matches = this.tournament()?.currentMatches;
    console.log('matches', matches);
    if (!Array.isArray(matches)) return;
    for (let m of matches) {
      if (!m.isNull && m.winner && m.status === 'finished') {
        const response = await this._userService.getById(m.winner);
        m.result = response.data.pseudo;
      } else if (m.isNull && m.status === 'finished') {
        m.result = 'Draw';
      } else {
        m.result = 'Live';
      }
    }
    this.tournament.set({ ...this.tournament()! });
  }

  async setResult(matchId: number, winner: string | null, isNull: string) {
    const payload = {
      winner,
      isNull,
      status: 'finished',
    };
    try {
      await this._tournamentService.updateMatch(payload, matchId);
      await this.onRefresh();
    } catch (error) {
      const e = error as Error;
      this.errorUpdate.set({ id: matchId, message: e.message });
    }
  }

  setUpdateTime() {
    const matches = this.tournament()?.currentMatches;
    if (!Array.isArray(matches) || !matches.length) return;

    const dates = matches.map((match) => dayjs(match.updatedAt));
    const mostRecent = dayjs.max(dates);

    this.updateTime.set(dayjs().diff(mostRecent, 'minute'));
  }
}
