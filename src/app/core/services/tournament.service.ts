import { HttpClient, HttpParams } from '@angular/common/http';
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

  async getAll(filters?: Record<string, string>): Promise<Array<Tournament>> {
    let params = new HttpParams({ fromObject: filters ?? {} });

    const response = await firstValueFrom(
      this._httpClient.get<ApiResponse<Array<Tournament>>>(this._apiUrl + '/tournament', {
        params,
      }),
    );
    console.log(response.data);
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

  async canRegister(tournamentId: number, userId: string): Promise<boolean> {
    const response = await firstValueFrom(
      this._httpClient.get<boolean>(
        this._apiUrl + '/tournament/can-register/' + tournamentId + '/user/' + userId,
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

  async unsubscribe(tournamentId: number): Promise<ApiMessageOrError> {
    const response = await firstValueFrom(
      this._httpClient.delete<ApiMessageOrError>(
        this._apiUrl + '/tournament/unsubscribe/' + tournamentId,
      ),
    );
    return response;
  }

  async getById(tournamentId: number): Promise<Tournament> {
    const response = await firstValueFrom(
      this._httpClient.get<ApiResponse<Tournament>>(this._apiUrl + '/tournament/' + tournamentId),
    );
    const data = response.data;
    return data;
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
