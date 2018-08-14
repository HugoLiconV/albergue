import { Component, OnInit } from '@angular/core';
import {
  ProjectService,
  AlertService } from '../../../_services';
import { Project } from '../../../_models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['../cards.css']
})
export class ProjectCardComponent implements OnInit {
  projects: Observable<Project[]>;
  loading = false;

  constructor(
  private projectService: ProjectService,
  private router: Router) {}

  ngOnInit() {
    this.projects = this.projectService.getProjects();
  }

  handleClick(id) {
    const currentRoute = this.router.url;
    if (currentRoute === '/home') {
      this.router.navigate(['/project-details', id]);
    } else {
      this.router.navigate(['/admin/project-form', id]);
    }
  }
}
