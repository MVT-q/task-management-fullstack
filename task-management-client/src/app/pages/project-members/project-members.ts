import { Component, Input } from '@angular/core';
import { ProjectMember } from '../../models/project-member.model';
import { ProjectRole } from '../../models/project-role';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { AddProjectMember } from '../../models/add-project-member.model';
import { UpdateProjectMemberRole } from '../../models/update-project-member-role.model';

@Component({
  selector: 'app-project-members',
  imports: [FormsModule],
  templateUrl: './project-members.html',
  styleUrl: './project-members.css',
})
export class ProjectMembers {
  @Input() projectId = 0;

  members: ProjectMember[] = [];

  showMembers = false;

  newMemberUserId = 0;

  editingMemberId: number | null = null;

  selectedRole: number = 0;
  roles = [
    { value: ProjectRole.Member, label: 'Member' },
    { value: ProjectRole.Manager, label: 'Manager' },
  ];

  constructor(private readonly projectService: ProjectService) {}

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

  startEditMemberRole(member: ProjectMember): void {
    this.editingMemberId = member.userId;
    this.selectedRole = member.role;
  }

  cancelMemberRoleEdit(): void {
    this.editingMemberId = null;
  }

  saveMemberRole(userId: number): void {
    const request: UpdateProjectMemberRole = {
      role: this.selectedRole,
    };

    this.projectService.updateMemberRole(this.projectId, userId, request).subscribe({
      next: (updatedMember) => {
        this.members = this.members.map((member) =>
          member.userId === userId ? updatedMember : member,
        );

        this.editingMemberId = null;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
