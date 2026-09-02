import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectTask } from '../models/project-task.model';
import { TaskQuery } from '../models/task-query.model';
import { Observable } from 'rxjs';

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
}
