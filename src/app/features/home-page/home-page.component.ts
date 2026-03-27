import { Component, inject, signal } from '@angular/core';
import { Status, TournamentStatusCard } from '@core/enums/status.enum';
import { Tournament } from '@core/models/tournament.interface';
import { TournamentService } from '@core/services/tournament.service';
import { TournamentCardComponent } from '@shared/components/tournament-card/tournament-card.component';

@Component({
  selector: 'app-home-page',
  imports: [TournamentCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  private readonly _tournamentService = inject(TournamentService);
  protected readonly categories: Array<string> = this._tournamentService.getAllCategories();
  protected readonly status: Array<string> = this._tournamentService.getAllStatus();

  tournaments = signal<Array<Tournament>>([]);

  async ngOnInit() {
    this.tournaments.set(await this._tournamentService.getAll());
  }
}
