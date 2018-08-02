import { Component, OnInit } from '@angular/core';
import {
  ProjectService,
  AlertService } from '../../../_services';
import { Project } from '../../../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['../cards.css']
})
export class ProjectCardComponent implements OnInit {
  projects: Project[];
  loading = false;

  constructor(
  private projectService: ProjectService,
  private alertService: AlertService,
  private router: Router) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    }, error => {
      this.alertService.error('Error en servidor');
    }, () => this.loading = false);
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
