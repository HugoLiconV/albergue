import { Injectable } from '@angular/core';
import { Project } from '../_models';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProjectService {
  private projectUrl = `${environment.API_URL}/projects`;  // URL to web api

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectUrl, project);
  }
}
