import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  ngOnInit() {
  }

  onSubmit(username, password) {
    this.authService.login('hugo@example.com', '123456').subscribe(gotToken => {
      console.log(`Got Token? ${gotToken}`);
    });
  }
}
