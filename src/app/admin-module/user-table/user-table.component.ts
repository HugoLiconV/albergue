import {Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { PersonService } from '../../_services';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

displayedColumns = ['name', 'isActive', 'code', 'action'];
  dataSource = new MatTableDataSource();

  isLoadingResults = true;

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.isLoadingResults = true;
    this.personService.getPeople().subscribe(people => {
      console.log(people);
      this.dataSource.data = people;
    },
    error => {},
    () => this.isLoadingResults = false);
  }

  editUser(data): void {
    console.log('edit');
    console.log(data);
  }

  deleteUser(data): void {
    console.log('delete');
    console.log(data);
  }
}
