import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  username = '';
  password = '';

  constructor(
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
  ) {}

  login(): void {
    this.authService
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        console.log(projects);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
