import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RecordService } from '../../_services';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit, AfterViewInit {

  displayedColumns = ['user', 'fecha', 'hora'];
  dataSource = new MatTableDataSource();
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private recordService: RecordService) {
    this.populateTable();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  populateTable(): void {
    this.isLoadingResults = true;
    this.recordService.getRecords().subscribe(records => {
      console.log(records);
      this.dataSource.data = records;
    },
    error => {},
    () => this.isLoadingResults = false);
  }
}
