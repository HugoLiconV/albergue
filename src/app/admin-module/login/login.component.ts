import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthenticationService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService,
    public snackBar: MatSnackBar) {
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
    this.authService.login('hugo@example.com', '1234567').subscribe(
      data => {
        this.router.navigate(['/admin']);
      }, error => {
        console.log(error.statusText);
        // this.snackBar.open(error.statusText, 'cerrar', {
        //   duration: 2000
        // });
        this.alertService.error(error.statusText);
        this.loading = false;
      });
  }
}
