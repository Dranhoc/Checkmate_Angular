import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiResponse } from '@core/models/api.interface';
import { Tournament } from '@core/models/tournament.interface';
import { env } from '@env/env';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = env.apiURL;
  private readonly _authService = inject(AuthService);

  authUserId: string = this._authService.userId();

  async getAll(): Promise<Array<Tournament>> {
    const response = await firstValueFrom(
      this._httpClient.get<ApiResponse<Array<Tournament>>>(this._apiUrl + '/tournament/'),
    );

    return response.data;
  }
}
