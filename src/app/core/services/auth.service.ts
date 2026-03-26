import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { JwtDecoded, LoginResponse, RegisterData } from '@core/models/auth.interface';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom } from 'rxjs';
import { env } from '@env/env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);

  private readonly _apiUrl = env.apiURL;

  private _authToken = signal<string>('');
  authToken = this._authToken.asReadonly();

  private _userId = signal<string>('');
  userId = this._userId.asReadonly();

  private _admin = signal<boolean | null>(null);
  admin = this._admin.asReadonly();

  isAdmin = computed(() => {
    return this.admin();
  });
  isConnected = computed(() => !!this.authToken());

  constructor() {
    effect(() => {
      const token = this._authToken();
      if (!token) {
        localStorage.removeItem('token');
        this._admin.set(null);
        return;
      }
      localStorage.setItem('token', token);
      const decoded: JwtDecoded = jwtDecode(token);
      if (decoded.id && decoded.exp && decoded.exp * 1000 > Date.now()) {
        this._admin.set(decoded.isAdmin);
        this._userId.set(decoded.id);
        console.log('USERID : ', this._userId);
      } else {
        this._authToken.set('');
      }
    });

    const localToken = localStorage.getItem('token');
    if (localToken) {
      this._authToken.set(localToken);
    }
  }

  async login(email: string, password: string): Promise<void | string> {
    const response = await firstValueFrom(
      this._httpClient.post<LoginResponse>(this._apiUrl + '/auth/login', {
        email,
        password,
      }),
    );
    this._authToken.set(response.token);
  }

  async register(userData: RegisterData): Promise<void> {
    await firstValueFrom(this._httpClient.post(this._apiUrl + '/auth/register', userData));
  }

  logout() {
    this._authToken.set('');
  }
}
