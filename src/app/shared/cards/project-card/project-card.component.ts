import { Component, OnInit } from '@angular/core';
import {
  ProjectService,
  AlertService,
  FormatDateService} from '../../../_services/';
import { Project } from '../../../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['../cards.css']
})
export class ProjectCardComponent implements OnInit {
  projects: Project[];
  error = '';
  loading = false;

  constructor(
  private projectService: ProjectService,
  private alertService: AlertService,
  private formatDateService: FormatDateService,
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
      });
      this.loading = false;
  }

  formatDate(date) {
    return this.formatDateService.formatDate(date);
  }

  handleClick(id) {
    console.log(`project: ${id}`);
    this.router.navigate(['/project-details', id]);
  }
}
