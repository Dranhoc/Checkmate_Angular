import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterData } from '@core/models/auth.interface';
import { AuthService } from '@core/services/auth.service';
import { passwordValidator } from '@core/validators/password.validator';
import { FormsErrorDisplay } from '@shared/components/forms-error-display/forms-error-display';

@Component({
  selector: 'app-auth-register-page',
  imports: [ReactiveFormsModule, FormsErrorDisplay],
  templateUrl: './auth-register-page.html',
  styleUrl: './auth-register-page.scss',
})
export class AuthRegisterPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  firstname = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
  ]);
  lastname = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, passwordValidator()]);

  formRegister = this._fb.group({
    lastname: this.lastname,
    firstname: this.firstname,
    email: this.email,
    password: this.password,
  });

  onSubmitRegister() {
    this.formRegister.markAllAsTouched();

    if (this.formRegister.valid) {
      const data: RegisterData = {
        email: this.formRegister.value.email!,
        password: this.formRegister.value.password!,
        lastname: this.formRegister.value.lastname!,
        firstname: this.formRegister.value.firstname!,
      };
      this._authService.register(data).then(() => {
        console.log('Formulaire valide');
        console.log(this.formRegister.value);

        this._router.navigate(['/', 'auth', 'login']);
      });
    }
  }
}
