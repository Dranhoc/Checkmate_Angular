import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '@core/models/api.interface';
import { User, UserData } from '@core/models/user.interface';
import { env } from '@env/env';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = env.apiURL;

  async getAll(): Promise<ApiResponse<Array<User>>> {
    const response = await firstValueFrom(
      this._httpClient.get<ApiResponse<Array<User>>>(this._apiUrl + '/user'),
    );
    return response;
  }
  async getById(userId: string): Promise<ApiResponse<UserData>> {
    const response = await firstValueFrom(
      this._httpClient.get<ApiResponse<UserData>>(this._apiUrl + '/user/' + userId),
    );
    return response;
  }
}
