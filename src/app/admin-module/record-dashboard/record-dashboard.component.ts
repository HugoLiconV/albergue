import { Component, OnInit, ViewChild } from '@angular/core';
import { UserTableComponent } from '../user-table/user-table.component';
import { MatDialog } from '@angular/material';
import { RecordComponent } from '../record/record.component';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { DeviceTypeService } from '../../_services';

@Component({
  selector: 'app-record-dashboard',
  templateUrl: './record-dashboard.component.html',
  styleUrls: ['./record-dashboard.component.css']
})
export class RecordDashboardComponent implements OnInit {

  @ViewChild(UserTableComponent) userTableInstance;
  @ViewChild(RecordComponent) recordComponent;

  private isMobile: boolean;

  constructor(
    public dialog: MatDialog,
    private deviceTypeService: DeviceTypeService) { }

  ngOnInit() {
    this.isMobile = this.deviceTypeService.isMobile();
  }

  createUser() {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: this.isMobile ? '80%' : '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // recibe true si se editó
        this.userTableInstance.populateTable();
      }
    });
  }

  updateRecordTable(): void {
    this.recordComponent.populateTable();
  }

}
