import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { PersonService, AlertService, DeviceTypeService, DataRefreshService } from '../../_services';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'isBlocked', 'code', 'action'];
  dataSource = new MatTableDataSource();

  editDialogSubscription: ISubscription;
  deleteDialogSubscription: ISubscription;
  getDataSubscription: ISubscription;
  deleteDataSubscription: ISubscription;

  isLoadingResults = true;
  private isMobile: boolean;
  private dialogWidth: string;

  constructor(
    private personService: PersonService,
    public dialog: MatDialog,
    private alertService: AlertService,
    private deviceTypeService: DeviceTypeService,
    private dataRefreshService: DataRefreshService
  ) {}

  ngOnInit() {
    this.isMobile = this.deviceTypeService.isMobile();
    this.dialogWidth = this.isMobile ? '80%' : '50%';
    this.populateTable();
  }

  populateTable(): void {
    this.isLoadingResults = true;
    this.getDataSubscription = this.personService.getPeople().subscribe(people => {
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

    this.editDialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) { // recibe true si se editó
        this.populateTable();
      }
    });
  }

  deleteUser(userId): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: this.dialogWidth,
      data: {
        title: 'Eliminar usuario',
        action: 'eliminar',
        color: 'warn',
        details: 'Al eliminar el usuario se eliminarán también su registro'}
    });

    this.deleteDialogSubscription = dialogRef.afterClosed().subscribe(result => {
      this.isLoadingResults = true;
      if (result) { // recibe true si se editó
        this.populateTable();
        this.deleteDataSubscription = this.personService.deletePerson(userId).subscribe(_ => {
          this.alertService.success('Usuario eliminado con éxito');
          this.populateTable();
          // actualiza la tabla de registro
          this.dataRefreshService.refresh();
        });
      }
      this.isLoadingResults = false;
    });
  }

  ngOnDestroy(): void {
    if (this.getDataSubscription) {
      this.getDataSubscription.unsubscribe();
    }
    if (this.deleteDataSubscription) {
      this.deleteDataSubscription.unsubscribe();
    }
    if (this.editDialogSubscription) {
      this.editDialogSubscription.unsubscribe();
    }
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
