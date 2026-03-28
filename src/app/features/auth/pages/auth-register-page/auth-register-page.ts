import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from '@core/enums/gender.enum';
import { RegisterData } from '@core/models/auth.interface';
import { AuthService } from '@core/services/auth.service';
import { birthDateValidator } from '@core/validators/birthdate.validator';
import { passwordValidator } from '@core/validators/password.validator';
import { FormsErrorDisplay } from '@shared/components/forms-error-display/forms-error-display';
import dayjs from 'dayjs';

@Component({
  selector: 'app-auth-register-page',
  imports: [ReactiveFormsModule, FormsErrorDisplay],
  templateUrl: './auth-register-page.html',
  styleUrl: './auth-register-page.css',
})
export class AuthRegisterPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  genderOpt = Object.keys(Gender);

  pseudo = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);
  birthDate = new FormControl('2000-01-01', [Validators.required, birthDateValidator()]);
  gender = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, passwordValidator()]);

  formRegister = this._fb.group({
    pseudo: this.pseudo,
    email: this.email,
    birthDate: this.birthDate,
    gender: this.gender,
    password: this.password,
  });

  onSubmitRegister() {
    this.formRegister.markAllAsTouched();

    if (this.formRegister.valid) {
      const data: RegisterData = {
        email: this.formRegister.value.email!,
        birthDate: dayjs(this.formRegister.value.birthDate!).format('YYYY-MM-DD'),
        password: this.formRegister.value.password!,
        gender: this.formRegister.value.gender!,
        pseudo: this.formRegister.value.pseudo!,
      };
      this._authService
        .register(data)
        .then(() => this._router.navigate(['/', 'auth', 'login']))
        .catch((err) => {
          if (err.error?.message === 'Email already exists') {
            this.email.setErrors({ emailExists: true });
          }
          if (err.error?.message === 'Pseudo already exists') {
            this.pseudo.setErrors({ pseudoExists: true });
          }
        });
    }
  }
}
