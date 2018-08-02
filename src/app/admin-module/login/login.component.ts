import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AlertService, AuthenticationService } from '../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService) {
    }

  loading = false;
  hide = true;

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Debes introducir un valor' :
      this.email.hasError('email') ? 'Email no válido' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Debes introducir un valor' :
      this.password.hasError('minlength') ? 'La contraseña debe ser de al menos 6 caracteres' : '';
  }

  ngOnInit() {
    this.authService.logout();
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSubmit(formValues) {
    console.log(formValues);
    this.loading = true;
    this.authService.login(formValues.email, formValues.password).subscribe(data => {
      if (data) {
        this.router.navigate(['/admin']);
      }
    }, error => {
      if (error.status === 401) {
        this.alertService.error('Usuario o contraseña incorrecta');
      } else {
        if (error.error && error.error.message) {
          this.alertService.error(error.error.message);
        } else {
          this.alertService.error(error.message);
        }
      }
    });
    this.loading = false;
  }
}
