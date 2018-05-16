import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../../project';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  projects: Project[];
  error = '';
  loading = false;

  constructor(
  private projectService: ProjectService,
  private alertService: AlertService) {}

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
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Deciembre'
    ];
    const myDate = new Date(date);
    const day = myDate.getDate();
    const monthIndex = myDate.getMonth();
    const year = myDate.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
}
