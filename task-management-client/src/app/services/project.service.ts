import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { CreateProject } from '../models/create-project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly apiUrl = 'https://localhost:7056/api/projects';

  constructor(private readonly http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  createProject(project: CreateProject): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}`);
  }
}
