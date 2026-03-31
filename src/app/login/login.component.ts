import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],

    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
    ]]
  });

  login(): void {

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const data: LoginRequest = this.loginForm.getRawValue();

  this.authService.login(data)
    .subscribe({
      next: (response) => {

        if (!response.success || !response.data) {
          alert(response.message || 'Invalid credentials');
          return;
        }

        const user = response.data;

        if (user.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/customer']);
        }
      },

      error: (err) => {
        alert(err.error?.message || 'Login failed');
      }
    });
}

}