import { Component, Input } from '@angular/core';
import { ProjectTask } from '../../models/task/project-task.model';
import { ProjectTaskStatus } from '../../models/enums/project-task-status';
import { ProjectTaskPriority } from '../../models/enums/project-task-priority';
import { TaskSortBy } from '../../models/enums/task-sort-by';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { TaskQuery } from '../../models/task/task-query.model';
import { ProjectTaskService } from '../../services/project-task.service';
import { CreateProjectTask } from '../../models/task/create-project-task.model';
import { UpdateProjectTask } from '../../models/task/update-project-task.model';
import { UpdateProjectTaskStatus } from '../../models/task/update-project-task-status.model';
import { UpdateProjectTaskPriority } from '../../models/task/update-project-task-priority.model';
import { UpdateProjectTaskDueDate } from '../../models/task/update-project-task-due-date.model';
import { UpdateProjectTaskAssignee } from '../../models/task/update-project-task-assignee.model';
import { PagedResult } from '../../models/common/paged-result.model';

@Component({
  selector: 'app-project-tasks',
  imports: [FormsModule],
  templateUrl: './project-tasks.html',
  styleUrl: './project-tasks.css',
})
export class ProjectTasks {
  @Input() projectId = 0;

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
  totalCount = 0;

  taskTitle = '';
  taskDescription = '';
  taskDueDate: string | null = null;

  editingTaskId: number | null = null;
  editingOriginalTask: ProjectTask | null = null;
  editingTaskTitle = '';
  editingTaskDescription = '';
  editingTaskStatus: ProjectTaskStatus = ProjectTaskStatus.Todo;
  editingTaskPriority: ProjectTaskPriority = ProjectTaskPriority.Medium;
  editingTaskDueDate: string | null = null;
  editingTaskAssigneeId: number | null = null;

  constructor(private readonly projectTaskService: ProjectTaskService) {}

  loadTasks(): Observable<PagedResult<ProjectTask>> {
    const query: TaskQuery = {
      search: this.search,
      status: this.selectedStatus,
      priority: this.selectedPriority,
      sortBy: this.selectedSortBy,
      descending: this.selectedDescending,
      page: this.currentPage,
      pageSize: this.pageSize,
    };

    return this.projectTaskService.getTasks(this.projectId, query);
  }

  searchTasks(): void {
    this.refreshTasks();
    this.showTasks = true;
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages) {
      return;
    }

    this.currentPage++;
    this.refreshTasks();
  }

  previousPage(): void {
    if (this.currentPage === 1) {
      return;
    }

    this.currentPage--;
    this.refreshTasks();
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  createTask(): void {
    const task: CreateProjectTask = {
      title: this.taskTitle,
      description: this.taskDescription,
      dueDate: this.taskDueDate,
    };

    this.projectTaskService.createProjectTask(this.projectId, task).subscribe({
      next: () => {
        this.refreshTasks();

        this.taskTitle = '';
        this.taskDescription = '';
        this.taskDueDate = null;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteTask(taskId: number): void {
    this.projectTaskService.deleteProjectTask(this.projectId, taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  startEditTask(task: ProjectTask): void {
    this.editingOriginalTask = task;
    this.editingTaskId = task.id;
    this.editingTaskTitle = task.title;
    this.editingTaskDescription = task.description;
    this.editingTaskStatus = task.status;
    this.editingTaskPriority = task.priority;
    this.editingTaskDueDate = task.dueDate ? task.dueDate.split('T')[0] : null;
    this.editingTaskAssigneeId = task.assigneeId;
  }

  cancelEditTask(): void {
    this.editingTaskId = null;
  }

  saveTask(): void {
    if (this.editingTaskId === null || this.editingOriginalTask === null) {
      return;
    }

    const requests: Observable<ProjectTask>[] = [];

    if (
      this.editingTaskTitle !== this.editingOriginalTask.title ||
      this.editingTaskDescription !== this.editingOriginalTask.description
    ) {
      const request: UpdateProjectTask = {
        title: this.editingTaskTitle,
        description: this.editingTaskDescription,
      };

      const update$ = this.projectTaskService.updateProjectTask(
        this.projectId,
        this.editingTaskId,
        request,
      );

      requests.push(update$);
    }

    if (this.editingTaskStatus !== this.editingOriginalTask.status) {
      const request: UpdateProjectTaskStatus = {
        status: this.editingTaskStatus,
      };

      const update$ = this.projectTaskService.updateProjectTaskStatus(
        this.projectId,
        this.editingTaskId,
        request,
      );

      requests.push(update$);
    }

    if (this.editingTaskPriority !== this.editingOriginalTask.priority) {
      const request: UpdateProjectTaskPriority = {
        priority: this.editingTaskPriority,
      };

      const update$ = this.projectTaskService.updateProjectTaskPriority(
        this.projectId,
        this.editingTaskId,
        request,
      );

      requests.push(update$);
    }

    const originalDueDate = this.editingOriginalTask.dueDate
      ? this.editingOriginalTask.dueDate.split('T')[0]
      : null;

    if (this.editingTaskDueDate !== originalDueDate) {
      const request: UpdateProjectTaskDueDate = {
        dueDate: this.editingTaskDueDate,
      };

      const update$ = this.projectTaskService.updateProjectTaskDueDate(
        this.projectId,
        this.editingTaskId,
        request,
      );

      requests.push(update$);
    }

    if (this.editingTaskAssigneeId !== this.editingOriginalTask.assigneeId) {
      const request: UpdateProjectTaskAssignee = {
        userId: this.editingTaskAssigneeId,
      };

      const update$ = this.projectTaskService.updateProjectTaskAssignee(
        this.projectId,
        this.editingTaskId,
        request,
      );

      requests.push(update$);
    }

    if (requests.length === 0) {
      return;
    }

    forkJoin(requests)
      .pipe(switchMap(() => this.loadTasks()))
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks.items;
          this.showTasks = true;
          this.totalCount = tasks.totalCount;

          const updatedTask = tasks.items.find((task) => task.id === this.editingTaskId);

          this.editingOriginalTask = updatedTask ?? null;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  refreshTasks(): void {
    this.loadTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks.items;
        this.totalCount = tasks.totalCount;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
