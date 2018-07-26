import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../_models';
import { ProjectService, AlertService, FormatDateService } from '../../_services';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent implements OnInit {
  project: Project;
  private sub: any;
  formatedDate;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private alertService: AlertService,
    private formatDateService: FormatDateService
  ) { }

  ngOnInit() {
    this.project = this.route.snapshot.data['project'];
    this.formatedDate = this.formatDateService.formatDate(this.project.publicationDate);
    // console.log(this.project);
    // this.sub = this.route.params.subscribe(params => {
    //    const id = params['id']; // (+) converts string 'id' to a number
    //     this.projectService.getProjectById(id)
    //     .subscribe(_project => {
    //       this.project = _project;
    //       this.formatedDate = this.formatDateService.formatDate(this.project.publicationDate);
    //     }, error => {
    //       this.alertService.error(error.message);
    //     });
    // });
  }


}
