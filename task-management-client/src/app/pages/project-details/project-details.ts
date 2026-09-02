import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ProjectMember } from '../../models/project-member.model';
import { FormsModule } from '@angular/forms';
import { AddProjectMember } from '../../models/add-project-member.model';
import { ProjectRole } from '../../models/project-role';
import { UpdateProjectMemberRole } from '../../models/update-project-member-role.model';
import { ProjectTask } from '../../models/project-task.model';
import { TaskQuery } from '../../models/task-query.model';
import { ProjectTaskService } from '../../services/project-task.service';
import { ProjectTaskStatus } from '../../models/project-task-status';
import { ProjectTaskPriority } from '../../models/project-task-priority';
import { TaskSortBy } from '../../models/task-sort-by';

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

  editingMemberId: number | null = null;

  selectedRole: number = 0;
  roles = [
    { value: ProjectRole.Member, label: 'Member' },
    { value: ProjectRole.Manager, label: 'Manager' },
  ];

  tasks: ProjectTask[] = [];
  showTasks = false;

  search = '';

  selectedStatus: number | undefined;
  statuses = [
    { value: ProjectTaskStatus.Todo, label: 'Todo' },
    { value: ProjectTaskStatus.InProgress, label: 'In progress' },
    { value: ProjectTaskStatus.Done, label: 'Done' },
  ];

  selectedPriority: number | undefined;
  priorities = [
    { value: ProjectTaskPriority.Low, label: 'Low' },
    { value: ProjectTaskPriority.Medium, label: 'Medium' },
    { value: ProjectTaskPriority.High, label: 'High' },
  ];

  selectedSortBy: number | undefined;
  sorts = [
    { value: TaskSortBy.Status, label: 'Sort by status' },
    { value: TaskSortBy.Priority, label: 'Sort by priority' },
    { value: TaskSortBy.DueDate, label: 'Sort by due date' },
  ];

  selectedDescending: boolean | undefined;

  currentPage = 1;
  pageSize = 2;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly projectService: ProjectService,
    private readonly projectTaskService: ProjectTaskService,
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

  loadTasks(): void {
    const query: TaskQuery = {
      search: this.search,
      status: this.selectedStatus,
      priority: this.selectedPriority,
      sortBy: this.selectedSortBy,
      descending: this.selectedDescending,
      page: this.currentPage,
      pageSize: this.pageSize,
    };

    this.projectTaskService.getTasks(this.projectId, query).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.showTasks = true;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  nextPage(): void {
    if (this.tasks.length === this.pageSize) {
      this.currentPage++;
      this.loadTasks();
    } else if (this.tasks.length < this.pageSize) {
      return;
    }
  }

  previousPage(): void {
    if (this.currentPage === 1) {
      return;
    }

    this.currentPage--;
    this.loadTasks();
  }
}
