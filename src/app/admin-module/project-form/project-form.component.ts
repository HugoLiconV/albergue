import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { ProjectService, AlertService } from '../../_services';
import { Project } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['../forms.css']
})
export class ProjectFormComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  projectForm: FormGroup;
  separatorKeysCodes = [ENTER, COMMA];

  elements: string[] = [];
  project: Project;
  id: string;

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      solution: ['', Validators.required],
      numberOfPeople: ['', Validators.required]
    });
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.projectService.getProjectById(this.id).subscribe(project => {
        this.project = project;
        this.projectForm.setValue({
          name: this.project.name,
          description: this.project.description,
          solution: this.project.solution,
          numberOfPeople: this.project.numberOfPeople,
        });
        this.elements = this.project.area.split(',');
      }, error => this.errorHandler(error));
    }
  }

  addArea(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.elements.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeArea(elem: any): void {
    const index = this.elements.indexOf(elem);

    if (index >= 0) {
      this.elements.splice(index, 1);
    }
  }

  addProject(formValues) {
    let project: Project = new Project();
    project = {
      ...formValues,
      ...project,
      area: this.elements.toString()
    };
    const isNewProject = this.id === null;
    if  (isNewProject) {
      this.projectService.addProject(project).subscribe(_ => {
          this.alertService.success('Proyecto Creado con éxito');
          this.router.navigate(['/admin/dashboard']);
      }, error => this.errorHandler(error));
    } else {
      this.projectService.editProject(project, this.id).subscribe(_ => {
        this.alertService.success('Proyecto Modificado con éxito');
        this.router.navigate(['/admin/dashboard']);
      }, error => this.errorHandler(error));
    }
  }
  private errorHandler(error) {
    this.alertService.error(error.message);
  }
  cancel() {
    this.router.navigate(['/admin/dashboard']);
  }
}
