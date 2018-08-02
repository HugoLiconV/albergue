import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { PersonService, AlertService, DeviceTypeService } from '../../_services';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { RecordTableComponent } from '../record-table/record-table.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  @ViewChild(RecordTableComponent) recordComponent;

  displayedColumns = ['name', 'isBlocked', 'code', 'action'];
  dataSource = new MatTableDataSource();

  isLoadingResults = true;
  private isMobile: boolean;
  private dialogWidth: string;

  constructor(
    private personService: PersonService,
    public dialog: MatDialog,
    private alertService: AlertService,
    private deviceTypeService: DeviceTypeService
  ) {}

  ngOnInit() {
    this.isMobile = this.deviceTypeService.isMobile();
    this.dialogWidth = this.isMobile ? '80%' : '50%';
    this.populateTable();
  }

  populateTable(): void {
    this.isLoadingResults = true;
    this.personService.getPeople().subscribe(people => {
      this.dataSource.data = people;
    },
    error => {},
    () => this.isLoadingResults = false);
  }

  editUser(data): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: this.dialogWidth,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // recibe true si se editó
        this.populateTable();
      }
    });
  }

  deleteUser(userId): void {
    console.log(this.recordComponent.prueba());
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: this.dialogWidth,
      data: {
        title: 'Eliminar usuario',
        action: 'eliminar',
        color: 'warn',
        details: 'Al eliminar el usuario se eliminarán también su registro'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoadingResults = true;
      if (result) { // recibe true si se editó
        this.populateTable();
        this.personService.deletePerson(userId).subscribe(_ => {
          this.alertService.success('Usuario eliminado con éxito');
          this.populateTable();
          this.recordComponent.populateTable();
        });
      }
      this.isLoadingResults = false;
    });
  }
}
