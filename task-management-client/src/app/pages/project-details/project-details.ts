import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ProjectMember } from '../../models/project-member.model';
import { FormsModule } from '@angular/forms';
import { AddProjectMember } from '../../models/add-project-member.model';

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

  newMemberUserId = 0;

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

  addMember(): void {
    const request: AddProjectMember = {
      userId: this.newMemberUserId,
    };

    this.projectService.addProjectMember(this.projectId, request).subscribe({
      next: (member) => {
        this.members.push(member);
        this.newMemberUserId = 0;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  removeMember(userId: number): void {
    this.projectService.removeProjectMember(this.projectId, userId).subscribe({
      next: () => {
        this.members = this.members.filter((member) => member.userId !== userId);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
