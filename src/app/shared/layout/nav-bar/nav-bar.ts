import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private readonly _authService = inject(AuthService);
  isAdmin = this._authService.isAdmin;
  isConnected = this._authService.isConnected;

  onLogoutBtn() {
    this._authService.logout();
  }
}
