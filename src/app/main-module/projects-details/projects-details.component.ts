import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../_models';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent implements OnInit {
  project: Project;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.project = this.route.snapshot.data['project'];
  }
}
