import { Injectable } from '@angular/core';
import { Project } from '../_models';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/RX';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';
@Injectable()
export class ProjectService {
  private projectUrl = `${environment.API_URL}/projects`;  // URL to web api

  constructor(
    private http: HttpClient,
    private alertService: AlertService
    ) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl)
      .pipe(catchError(this.handleError<Project[]>('obteniendo proyectos', [])));
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.projectUrl}/${id}`)
      .pipe(catchError(this.handleError<Project>('obteniendo proyecto')));
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectUrl, project)
      .pipe(catchError(this.handleError<Project>('añadiendo proyecto')));
  }

  editProject(project: Project, id: string): Observable<Project> {
    return this.http.put<Project>(`${this.projectUrl}/${id}`, project)
      .pipe(catchError(this.handleError<Project>('editando proyecto')));
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.projectUrl}/${id}`)
      .pipe(catchError(this.handleError<any>('eliminando proyecto')));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(`Error ${operation}: ${error.message}`);
      return Observable.of(result as T);
    };
  }
}
