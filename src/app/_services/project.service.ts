import { Injectable } from '@angular/core';
import { Project } from '../_models';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProjectService {
  private projectUrl = `${environment.API_URL}/projects`;  // URL to web api

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl);
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.projectUrl}/${id}`);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectUrl, project);
  }

  editProject(project: Project, id: string): Observable<Project> {
    return this.http.put<Project>(`${this.projectUrl}/${id}`, project);
  }
}
