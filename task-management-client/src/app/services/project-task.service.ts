import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectTask } from '../models/project-task.model';
import { TaskQuery } from '../models/task-query.model';
import { Observable } from 'rxjs';
import { CreateProjectTask } from '../models/create-project-task.model';
import { UpdateProjectTask } from '../models/update-project-task.model';
import { UpdateProjectTaskStatus } from '../models/update-project-task-status.model';
import { UpdateProjectTaskPriority } from '../models/update-project-task-priority.model';
import { UpdateProjectTaskDueDate } from '../models/update-project-task-due-date.model';
import { UpdateProjectTaskAssignee } from '../models/update-project-task-assignee.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectTaskService {
  private readonly apiUrl = 'https://localhost:7056/api/projects';

  constructor(private readonly http: HttpClient) {}

  getTasks(projectId: number, query: TaskQuery): Observable<ProjectTask[]> {
    let params = new HttpParams();

    if (query.search) {
      params = params.set('search', query.search);
    }

    if (query.status !== undefined) {
      params = params.set('status', query.status);
    }

    if (query.priority !== undefined) {
      params = params.set('priority', query.priority);
    }

    if (query.sortBy !== undefined) {
      params = params.set('sortBy', query.sortBy);
    }

    if (query.descending !== undefined) {
      params = params.set('descending', query.descending);
    }

    if (query.page !== undefined) {
      params = params.set('page', query.page);
    }

    if (query.pageSize !== undefined) {
      params = params.set('pageSize', query.pageSize);
    }

    return this.http.get<ProjectTask[]>(`${this.apiUrl}/${projectId}/tasks`, { params });
  }

  createProjectTask(projectId: number, request: CreateProjectTask): Observable<ProjectTask> {
    return this.http.post<ProjectTask>(`${this.apiUrl}/${projectId}/tasks`, request);
  }

  deleteProjectTask(projectId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/tasks/${taskId}`);
  }

  updateProjectTask(projectId: number, taskId: number, request: UpdateProjectTask): Observable<ProjectTask> {
    return this.http.put<ProjectTask>(`${this.apiUrl}/${projectId}/tasks/${taskId}`, request)
  }

  updateProjectTaskStatus(projectId: number, taskId: number, request: UpdateProjectTaskStatus): Observable<ProjectTask> {
    return this.http.patch<ProjectTask>(`${this.apiUrl}/${projectId}/tasks/${taskId}/status`, request)
  }

  updateProjectTaskPriority(projectId: number, taskId: number, request: UpdateProjectTaskPriority): Observable<ProjectTask> {
    return this.http.patch<ProjectTask>(`${this.apiUrl}/${projectId}/tasks/${taskId}/priority`, request)
  }

  updateProjectTaskDueDate(projectId: number, taskId: number, request: UpdateProjectTaskDueDate): Observable<ProjectTask> {
    return this.http.patch<ProjectTask>(`${this.apiUrl}/${projectId}/tasks/${taskId}/due-date`, request)
  }

  updateProjectTaskAssignee(projectId: number, taskId: number, request: UpdateProjectTaskAssignee): Observable<ProjectTask> {
    return this.http.patch<ProjectTask>(`${this.apiUrl}/${projectId}/tasks/${taskId}/assignee`, request)
  }
}
