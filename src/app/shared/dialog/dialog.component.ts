import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, PersonService } from '../../_services';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy {
  private subscription: ISubscription;
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      code: [this.data.code, [Validators.required, Validators.pattern(/^\d{4,6}$/)]],
      isBlocked: [this.data.isBlocked, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editUser(person): void {
    this.subscription = this.personService.editPerson(person, this.data.id).subscribe(_person => {
      if (_person) {
        this.alertService.success('Usuario editado con exito');
        this.dialogRef.close(true);
      }
    });
  }

  validateCode(): boolean {
    return this.userForm.controls.code.invalid &&
      this.userForm.controls.code.touched &&
        this.userForm.controls.code.errors.pattern;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
