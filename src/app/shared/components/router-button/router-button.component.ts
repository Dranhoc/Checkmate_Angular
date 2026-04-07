import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentStatusCard } from '@core/enums/status.enum';
import { AuthService } from '@core/services/auth.service';
import { TournamentService } from '@core/services/tournament.service';
import { sleep } from '@core/utils/sleep.utils';

@Component({
  selector: 'router-button',
  imports: [],
  templateUrl: './router-button.component.html',
  styleUrl: './router-button.component.css',
})
export class RouterButtonComponent {
  protected readonly TournamentStatusCard = TournamentStatusCard;
  private readonly _authService = inject(AuthService);
  private readonly _tournamentService = inject(TournamentService);
  private readonly _router = inject(Router);

  status = input.required<TournamentStatusCard>();
  tournamentId = input.required<number>();
  tournamentCanRegister = input<boolean>();
  registerError = signal('');
  detailsPage = input<boolean | undefined>(false);

  isConnected = this._authService.isConnected;

  actionDone = output();

  isDisabled = computed(
    () =>
      (this.status() === TournamentStatusCard.pending &&
        !this.tournamentCanRegister() &&
        this.isConnected()) ||
      this.status() === 'complete' ||
      this.status() === 'finished',
  );
  isDisabledWhenLoading = signal(false);

  navigate() {
    if (!this.isConnected()) {
      console.log('navigate not connected');

      this._router.navigate(['/', 'auth', 'login']);
    } else {
      console.log('got to the tournament');
      this._router.navigate(['/', 'tournament', this.tournamentId()]);
    }
  }
  async register() {
    const id = this.tournamentId();
    if (this.isConnected() && id) {
      try {
        const response = await this._tournamentService.register(id);
      } catch (err) {
        if (err instanceof HttpErrorResponse) {
          this.registerError.set(err.error.message);
        }
      }
    } else {
      this._router.navigate(['/', 'auth', 'login']);
    }
  }

  async unsubscribe() {
    const id = this.tournamentId();
    if (this.isConnected() && id) {
      try {
        const response = await this._tournamentService.unsubscribe(id);
      } catch (err) {
        if (err instanceof HttpErrorResponse) {
          this.registerError.set(err.error.message);
        }
      }
    } else {
      this._router.navigate(['/', 'auth', 'login']);
    }
  }

  async onClick() {
    this.isDisabledWhenLoading.set(true);
    await sleep(1000);

    if (this.detailsPage()) {
      if (this.status() === 'registered') {
        this.unsubscribe();
        this.actionDone.emit();
      } else {
        this.register();
        this.actionDone.emit();
      }
    } else {
      this.navigate();
    }
  }
}
