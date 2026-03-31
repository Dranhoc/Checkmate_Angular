import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiMessageOrError, ApiResponse } from '@core/models/api.interface';
import { Tournament, TournamentPayload } from '@core/models/tournament.interface';
import { env } from '@env/env';
import { catchError, firstValueFrom, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Categories } from '@core/enums/categories.enum';
import { TournamentStatusCard } from '@core/enums/status.enum';
import { PayloadMatchUpdate } from '@core/models/match.interface';
import { Score } from '@core/models/score.interface';

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
  //TODO check categories in express not in interface
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
    return firstValueFrom(
      this._httpClient
        .get<boolean>(`${this._apiUrl}/tournament/can-register/${tournamentId}/user/${userId}`)
        .pipe(catchError(() => of(false))),
    );
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
  async updateMatch(payload: PayloadMatchUpdate, matchId: number): Promise<ApiMessageOrError> {
    console.log(payload);

    const response = await firstValueFrom(
      this._httpClient.put<ApiMessageOrError>(
        this._apiUrl + '/tournament/match/' + matchId,
        payload,
      ),
    );
    return response;
  }

  async nextRound(tournamentId: number): Promise<ApiResponse<Tournament>> {
    const response = await firstValueFrom(
      this._httpClient.post<ApiResponse<Tournament>>(
        this._apiUrl + '/tournament/next-round/' + tournamentId,
        null,
      ),
    );
    return response;
  }

  async getScore(tournamentId: number): Promise<Array<Score>> {
    const response = await firstValueFrom(
      this._httpClient.get<ApiResponse<Array<Score>>>(
        this._apiUrl + '/tournament/score/' + tournamentId,
      ),
    );
    return response.data;
  }
}
