import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project/project.model';
import { CreateProject } from '../models/project/create-project.model';
import { UpdateProject } from '../models/task/update-project.model';
import { ProjectMember } from '../models/project/project-member.model';
import { AddProjectMember } from '../models/project/add-project-member.model';
import { UpdateProjectMemberRole } from '../models/project/update-project-member-role.model';

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

  updateProject(projectId: number, project: UpdateProject): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${projectId}`, project);
  }

  getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${projectId}`);
  }

  getProjectMembers(projectId: number): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.apiUrl}/${projectId}/members`);
  }

  addProjectMember(projectId: number, member: AddProjectMember): Observable<ProjectMember> {
    return this.http.post<ProjectMember>(`${this.apiUrl}/${projectId}/members`, member);
  }

  removeProjectMember(projectId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/members/${userId}`);
  }

  updateMemberRole(
    projectId: number,
    userId: number,
    request: UpdateProjectMemberRole,
  ): Observable<ProjectMember> {
    return this.http.patch<ProjectMember>(`${this.apiUrl}/${projectId}/members/${userId}`, request);
  }
}
