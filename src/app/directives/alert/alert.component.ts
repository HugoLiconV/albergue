import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;

  constructor(
    private alertService: AlertService,
    public snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'cerrar') {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
      if (this.message) {
      this.openSnackBar(this.message.text);
      }
    });
  }

}
