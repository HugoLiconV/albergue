import { Component, OnInit, Inject } from '@angular/core';
import { AlertService } from '../../_services';
import {MatSnackBar, MAT_SNACK_BAR_DATA, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;

  constructor(
    private alertService: AlertService,
    public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
      if (this.message) {
        this.openSnackBar(this.message.text, this.message.type);
      }
    });
  }
  openSnackBar(message: string, type: string, action: string = 'cerrar') {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.panelClass = [type];
    this.snackBar.open(message, action, config);
  }
}
