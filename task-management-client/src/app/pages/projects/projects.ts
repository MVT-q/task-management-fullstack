import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';
import { CreateProject } from '../../models/create-project.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  imports: [FormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projects: Project[] = [];

  projectName = '';
  projectDescription = '';

  constructor(
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  createProject(): void {
    const project: CreateProject = {
      name: this.projectName,
      description: this.projectDescription,
    };

    this.projectService.createProject(project).subscribe({
      next: (createdProject) => {
        this.projects.push(createdProject);

        this.projectName = '';
        this.projectDescription = '';
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/login']);
  }
}
