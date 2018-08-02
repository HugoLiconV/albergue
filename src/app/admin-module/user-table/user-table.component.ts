import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { PersonService, AlertService } from '../../_services';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  displayedColumns = ['name', 'isBlocked', 'code', 'action'];
  dataSource = new MatTableDataSource();

  isLoadingResults = true;

  constructor(
    private personService: PersonService,
    public dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit() {
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
      width: '50%',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // recibe true si se editó
        this.populateTable();
      }
    });
  }

  deleteUser(userId): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      data: {title: 'Eliminar usuario', action: 'eliminar', color: 'warn'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoadingResults = true;
      if (result) { // recibe true si se editó
        this.populateTable();
        this.personService.deletePerson(userId).subscribe(_user => {
          if (_user) {
            this.alertService.success('Usuario eliminado con éxito');
            this.populateTable();
          }
        });
      }
      this.isLoadingResults = false;
    });
  }
}
