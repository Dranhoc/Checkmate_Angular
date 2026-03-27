import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiMessageOrError, ApiResponse } from '@core/models/api.interface';
import { Tournament, TournamentPayload } from '@core/models/tournament.interface';
import { env } from '@env/env';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Categories } from '@core/enums/categories.enum';
import { TournamentStatusCard } from '@core/enums/status.enum';

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

  getAllCategories() {
    return Object.values(Categories);
  }
  getAllStatus() {
    return Object.values(TournamentStatusCard);
  }

  async register(tournamentId: number): Promise<ApiMessageOrError> {
    const response = await firstValueFrom(
      this._httpClient.post<ApiMessageOrError>(
        this._apiUrl + '/tournament/register/' + tournamentId,
        null,
      ),
    );
    return response;
  }

  async create(
    payload: TournamentPayload,
  ): Promise<ApiResponse<TournamentPayload> | ApiMessageOrError> {
    const response = await firstValueFrom(
      this._httpClient.post<ApiResponse<TournamentPayload> | ApiMessageOrError>(
        this._apiUrl + '/tournament',
        payload,
      ),
    );
    return response;
  }

  async delete(tournamentId: number): Promise<ApiMessageOrError> {
    const response = await firstValueFrom(
      this._httpClient.delete<ApiMessageOrError>(
        this._apiUrl + '/tournament/unsuscribe/' + tournamentId,
      ),
    );
    return response;
  }

  async getById(tournamentId: number): Promise<ApiResponse<Tournament>> {
    const response = await firstValueFrom(
      this._httpClient.get<ApiResponse<Tournament>>(this._apiUrl + '/tournament/' + tournamentId),
    );
    return response;
  }

  async start(tournamentId: number): Promise<ApiMessageOrError> {
    const response = await firstValueFrom(
      this._httpClient.post<ApiMessageOrError>(
        this._apiUrl + '/tournament/start/' + tournamentId,
        null,
      ),
    );
    return response;
  }
}
