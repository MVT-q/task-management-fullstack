import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project/project.model';
import { Router } from '@angular/router';
import { CreateProject } from '../../models/project/create-project.model';
import { FormsModule } from '@angular/forms';
import { UpdateProject } from '../../models/task/update-project.model';

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

  editingProjectId: number | null = null;
  editingName = '';
  editingDescription = '';

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

  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        this.projects = this.projects.filter((project) => project.id !== projectId);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  startEdit(project: Project): void {
    this.editingProjectId = project.id;
    this.editingName = project.name;
    this.editingDescription = project.description;
  }

  cancelEdit(): void {
    this.editingProjectId = null;
  }

  saveProject(projectId: number): void {
    const request: UpdateProject = {
      name: this.editingName,
      description: this.editingDescription,
    };

    this.projectService.updateProject(projectId, request).subscribe({
      next: (updateProject) => {
        this.projects = this.projects.map((project) =>
          project.id === projectId ? updateProject : project,
        );

        this.editingProjectId = null;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openProject(projectId: number): void {
    this.router.navigate(['/projects', projectId]);
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/login']);
  }
}
