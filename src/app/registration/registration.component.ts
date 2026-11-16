import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User, UserRole } from '../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  registrationForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],

    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
    ]],

    phone: ['', Validators.required,Validators.minLength(10)],
    role: ['CUSTOMER' as UserRole, Validators.required]
  });
  register(): void {

  if (this.registrationForm.invalid) return;

  const formValue = this.registrationForm.getRawValue();

  const newUser: User = {
    id: 0,
    name: formValue.name,
    email: formValue.email,
    password: formValue.password,
    phone: formValue.phone,
    role: formValue.role
  };

  this.authService.register(newUser)
  .subscribe({
    next: () => {
      alert('Registration successful! Please login.');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      alert('Something went wrong during registration. Please try again.');
      console.error(err);
    }
  });
}
}