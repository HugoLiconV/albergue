import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../_models';
import { ProjectService, AlertService } from '../../_services';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent implements OnInit {
  project: Project;
  id: string;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
        this.projectService.getProjectById(this.id)
        .subscribe(_project => {
          this.project = _project;
          console.log(this.project);
        }, error => {
          this.alertService.success(error.message);
        });
    });
  }
}
