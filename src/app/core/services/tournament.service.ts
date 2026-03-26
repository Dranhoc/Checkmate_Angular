import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiResponse } from '@core/models/api.interface';
import { Tournament } from '@core/models/tournament.interface';
import { env } from '@env/env';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = env.apiURL;

  // private _tournaments = signal<Array<Tournament>>([]);

  async getAll(): Promise<Array<Tournament>> {
    const response = await firstValueFrom(
      this._httpClient.get<ApiResponse<Array<Tournament>>>(this._apiUrl + '/tournament/'),
    );
    // this._tournaments.set(response);
    // console.log(this._tournaments);

    return response.data;
  }
}
