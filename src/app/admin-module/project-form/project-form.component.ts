import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { ProjectService, AlertService, DeviceTypeService } from '../../_services';
import { Project } from '../../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ISubscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['../forms.css']
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private deviceTypeService: DeviceTypeService,
    public dialog: MatDialog,
    private route: ActivatedRoute) { }

  getSubscription: ISubscription;
  actionSubscription: ISubscription;
  dialogSubscription: ISubscription;

  projectForm: FormGroup;
  separatorKeysCodes = [ENTER, COMMA];

  private isMobile: boolean;
  private dialogWidth: string;

  elements: string[] = [];
  project: Project;
  id: string;
  isLoading = false;

  ngOnInit() {
    this.isMobile = this.deviceTypeService.isMobile();
    this.dialogWidth = this.isMobile ? '80%' : '50%';

    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      solution: ['', Validators.required],
      numberOfPeople: ['']
    });
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isLoading = true;
      this.getSubscription = this.projectService.getProjectById(this.id).subscribe(project => {
        if (project) {
          this.project = project;
          this.projectForm.setValue({
            name: this.project.name,
            description: this.project.description,
            solution: this.project.solution,
            numberOfPeople: this.project.numberOfPeople
          });
          this.elements = this.project.area.split(',');
        }
      });
      this.isLoading = false;
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
    this.isLoading = true;
    let project: Project = new Project();
    project = {
      ...formValues,
      ...project,
      area: this.elements.toString()
    };
    const isNewProject = this.id === undefined;
    if  (isNewProject) {
      this.actionSubscription = this.projectService.addProject(project).subscribe(_project => {
        if (_project) {
          this.alertService.success('Proyecto Creado con éxito');
          this.router.navigate(['/admin/dashboard']);
        }
      });
    } else {
      this.actionSubscription = this.projectService.editProject(project, this.id).subscribe(_project => {
        if (_project) {
          this.alertService.success('Proyecto Editado con éxito');
          this.router.navigate(['/admin/dashboard']);
        }
      });
    }
    this.isLoading = false;
  }
  cancel() {
    this.router.navigate(['/admin/dashboard']);
  }

  deleteProject() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: this.dialogWidth,
      data: {
        title: 'Eliminar Proyecto',
        action: 'eliminar',
        color: 'warn'
      }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(confirmation => {
    if (confirmation) {
      this.isLoading = true;
      this.actionSubscription = this.projectService.deleteProject(this.id).subscribe(_ => {
        this.alertService.success('Proyecto eliminado con éxito');
        this.router.navigate(['/admin/dashboard']);
      }, error => {},
      () => this.isLoading = false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }
}
