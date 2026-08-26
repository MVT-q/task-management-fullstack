import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ProjectMember } from '../../models/project-member.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  imports: [FormsModule],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails implements OnInit {
  projectId: number = 0;
  project: Project | null = null;

  members: ProjectMember[] = [];
  showMembers = false;

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

  toggleMembers(): void {
    if (this.showMembers) {
      this.showMembers = false;
      return;
    }

    this.projectService.getProjectMembers(this.projectId).subscribe({
      next: (members) => {
        this.members = members;
        this.showMembers = true;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
