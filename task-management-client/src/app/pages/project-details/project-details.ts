import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-details',
  imports: [],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails implements OnInit {
  projectId: number = 0;
  project: Project | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));

    this.projectService.getProject(this.projectId).subscribe({
      next: (project) => {
        this.project = project;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
