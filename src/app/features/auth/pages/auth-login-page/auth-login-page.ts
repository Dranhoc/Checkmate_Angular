import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { FormsErrorDisplay } from '@shared/components/forms-error-display/forms-error-display';

@Component({
  selector: 'app-auth-login-page',
  imports: [RouterLink, ReactiveFormsModule, FormsErrorDisplay, NgClass],
  templateUrl: './auth-login-page.html',
  styleUrl: './auth-login-page.css',
})
export class AuthLoginPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  identifier = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  loginError = signal<boolean>(false);

  formLogin = this._fb.group({
    identifier: this.identifier,
    password: this.password,
  });

  async onSubmit() {
    this.formLogin.markAllAsTouched();

    if (this.formLogin.valid) {
      const identifier = this.formLogin.value.identifier!;
      const password = this.formLogin.value.password!;
      const isEmail = identifier.includes('@');

      console.log(this.formLogin.value);

      const response = await this._authService
        .login(isEmail ? { email: identifier, password } : { pseudo: identifier, password })
        .then(() => {
          this._router.navigate(['/']);
        })
        .catch((err: Error) => {
          console.log('auth login', err);
          this.loginError.set(true);
        });
    }
  }
}
