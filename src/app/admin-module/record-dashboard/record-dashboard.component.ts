import { Component, OnInit, ViewChild } from '@angular/core';
import { UserTableComponent } from '../user-table/user-table.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { RecordComponent } from '../record/record.component';

@Component({
  selector: 'app-record-dashboard',
  templateUrl: './record-dashboard.component.html',
  styleUrls: ['./record-dashboard.component.css']
})
export class RecordDashboardComponent implements OnInit {

  @ViewChild(UserTableComponent) userTableInstance;
  @ViewChild(RecordComponent) recordComponent;

  constructor(
    public dialog: MatDialog) { }
  ngOnInit() {
  }

  createUser() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
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
