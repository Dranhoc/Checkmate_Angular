import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentStatusCard } from '@core/enums/status.enum';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'router-button',
  imports: [],
  templateUrl: './router-button.component.html',
  styleUrl: './router-button.component.css',
})
export class RouterButtonComponent {
  protected readonly TournamentStatusCard = TournamentStatusCard;
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  status = input.required<TournamentStatusCard>();
  tournamentId = input<number>();
  tournamentCanRegister = input<boolean>();

  isConnected = this._authService.isConnected;

  isDisabled = computed(
    () =>
      (this.status() === TournamentStatusCard.pending &&
        !this.tournamentCanRegister() &&
        this.isConnected()) ||
      this.status() === 'complete',
  );

  navigateOnClick = computed(() =>
    !this.isConnected()
      ? this._router.navigate(['/', 'auth', 'login'])
      : this._router.navigate(['/', 'tournament', this.tournamentId()]),
  );
}
