import { Injectable } from '@angular/core';
import { Project } from '../_models';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/RX';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HandleErrorService } from './handle.error.service';
@Injectable()
export class ProjectService {
  private projectUrl = `${environment.API_URL}/projects`;  // URL to web api

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
    ) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl)
      .pipe(catchError(this.handleErrorService.handleError<Project[]>('obteniendo proyectos', [])));
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.projectUrl}/${id}`)
      .pipe(catchError(this.handleErrorService.handleError<Project>('obteniendo proyecto')));
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectUrl, project)
      .pipe(catchError(this.handleErrorService.handleError<Project>('añadiendo proyecto')));
  }

  editProject(project: Project, id: string): Observable<Project> {
    return this.http.put<Project>(`${this.projectUrl}/${id}`, project)
      .pipe(catchError(this.handleErrorService.handleError<Project>('editando proyecto')));
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.projectUrl}/${id}`)
      .pipe(catchError(this.handleErrorService.handleError<any>('eliminando proyecto')));
  }
}
