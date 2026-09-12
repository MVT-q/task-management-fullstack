import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RegisterRequest } from '../../models/auth/register-request.model';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = '';
  password = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  register(): void {
    const request: RegisterRequest = {
      username: this.username,
      password: this.password,
    };

    this.authService
      .register(request)
      .pipe(switchMap(() => this.authService.login(request)))
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  toLogin(): void {
    this.router.navigate(['/login']);
  }
}
