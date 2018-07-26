import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../_models';
import { FormatDateService } from '../../_services';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent implements OnInit {
  project: Project;
  formatedDate: string;
  constructor(
    private route: ActivatedRoute,
    private formatDateService: FormatDateService
  ) { }

  ngOnInit() {
    this.project = this.route.snapshot.data['project'];
    this.formatedDate = this.formatDateService.formatDate(this.project.publicationDate);
  }
}
