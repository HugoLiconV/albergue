import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../../project';
import { AlertService } from '../../../services/alert.service';
import {FormatDateService} from '../../../services/format.date.service';

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
  private formatDateService: FormatDateService) {}

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
}
