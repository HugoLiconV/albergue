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
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [this.data ? this.data.name : '', Validators.required],
      code: [this.data ? this.data.code : '', [Validators.required, Validators.pattern(/^\d{4,6}$/)]],
      isBlocked: [this.data ? this.data.isBlocked : false, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser(person): void {
    this.isLoading = true;
    const isNewUser = this.data === null || this.data === undefined;
    if (isNewUser) {
      this.personService.addPerson(person).subscribe(_person => {
        if (_person) {
          this.alertService.success('Usuario creado con éxito');
          this.isLoading = false;
          this.dialogRef.close(true);
        }
      });
    } else {
      this.subscription = this.personService.editPerson(person, this.data.id).subscribe(_person => {
        if (_person) {
          this.alertService.success('Usuario editado con éxito');
          this.isLoading = false;
          this.dialogRef.close(true);
        }
      });
    }
    this.isLoading = false;
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
