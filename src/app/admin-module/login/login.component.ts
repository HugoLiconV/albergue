import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AlertService, AuthenticationService } from '../../_services/';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService) {
    }

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  ngOnInit() {
    this.authService.logout();
  }

  onSubmit(username, password) {
    this.loading = true;
    this.authService.login(username, password).subscribe(
      data => {
      this.router.navigate(['/admin']);
      }, error => {
        if (error.status === 401) {
          this.alertService.error('Usuario o contraseña incorrecta');
        }
        this.loading = false;
      });
  }
}
