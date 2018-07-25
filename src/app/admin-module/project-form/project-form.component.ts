import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { ProjectService, AlertService } from '../../_services';
import { Project } from '../../_models';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['../forms.css']
})
export class ProjectFormComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private alertService: AlertService) { }

  projectForm: FormGroup;
  separatorKeysCodes = [ENTER, COMMA];

  elements: string[] = [];

  ngOnInit() {
    const name = new FormControl('', Validators.required);
    const description = new FormControl('', Validators.required);
    const solution = new FormControl('', Validators.required);
    const numberOfPeople = new FormControl('');

    this.projectForm = new FormGroup({
      name,
      description,
      solution,
      numberOfPeople
    });
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
    console.log(project);
    this.projectService.addProject(project).subscribe(_project => {
      if (_project) {
        this.alertService.success('Proyecto Creado con éxito');
        this.router.navigate(['/admin/dashboard']);
      }
    }, error => {
      this.alertService.error(error.message);
    });
  }

  cancel() {
    this.router.navigate(['/admin/dashboard']);
  }
}
