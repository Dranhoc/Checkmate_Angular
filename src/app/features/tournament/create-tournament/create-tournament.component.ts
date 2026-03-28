import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsErrorDisplay } from '@shared/components/forms-error-display/forms-error-display';
import dayjs from 'dayjs';
import { TournamentService } from '@core/services/tournament.service';
import { TournamentPayload } from '@core/models/tournament.interface';

@Component({
  selector: 'create-tournament',
  imports: [ReactiveFormsModule, FormsErrorDisplay],
  templateUrl: './create-tournament.component.html',
  styleUrl: './create-tournament.component.css',
})
export class CreateTournamentComponent {
  private readonly _tournamentService = inject(TournamentService);
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  protected readonly categoriesEnum: Array<string> = this._tournamentService.getAllCategories();

  name = new FormControl('', [Validators.required]);
  location = new FormControl('', [Validators.required]);
  minPlayer = new FormControl(2, [Validators.required, Validators.min(2), Validators.max(32)]);
  maxPlayer = new FormControl(32, [Validators.required, Validators.min(2), Validators.max(32)]);
  minElo = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(3000)]);
  maxElo = new FormControl(3000, [Validators.required, Validators.min(0), Validators.max(3000)]);
  womanOnly = new FormControl(false, [Validators.required]);
  categories = new FormControl([], [Validators.required]);
  currentRound = 0;
  endInscriptionDate = new FormControl('', []);

  formCreateTournament = this._fb.group({
    name: this.name,
    location: this.location,
    min_player: this.minPlayer,
    max_player: this.maxPlayer,
    min_elo: this.minElo,
    max_elo: this.maxElo,
    woman_only: this.womanOnly,
    categories: this.categories,
    current_round: this.currentRound,
    end_inscription_date: this.endInscriptionDate,
  });

  onSubmitCreate() {
    this.formCreateTournament.markAllAsTouched();

    if (this.formCreateTournament.valid) {
      const data: TournamentPayload = {
        name: this.formCreateTournament.value.name!,
        location: this.formCreateTournament.value.location!,
        min_player: this.formCreateTournament.value.min_player!,
        max_player: this.formCreateTournament.value.max_player!,
        min_elo: this.formCreateTournament.value.min_elo!,
        max_elo: this.formCreateTournament.value.max_elo!,
        woman_only: this.formCreateTournament.value.woman_only!,
        categories: this.formCreateTournament.value.categories!,
        current_round: this.formCreateTournament.value.current_round!,
        end_inscription_date: dayjs(this.formCreateTournament.value.end_inscription_date!).format(
          'YYYY-MM-DD',
        ),
      };
      this._tournamentService.create(data).then(() => this._router.navigate(['/']));
    }
  }
}
