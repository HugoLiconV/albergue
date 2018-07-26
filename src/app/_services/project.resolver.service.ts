import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectService } from './project.service';
import { Observable } from 'rxjs/Observable';
import { Project } from '../_models';
@Injectable()
export class ProjectResolverServiceService implements Resolve<any> {
  sub: any;
  constructor(
    private projectService: ProjectService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Project> {
    console.log('resolviendo');
    const id = route.paramMap.get('id');
    return this.projectService.getProjectById(id).pipe();
  }
}
