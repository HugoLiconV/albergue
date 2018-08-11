import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RecordService, DataRefreshService } from '../../_services';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['user', 'fecha', 'hora'];
  dataSource = new MatTableDataSource();
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private recordService: RecordService,
    private dataRefreshService: DataRefreshService) {
  }

  ngOnInit() {
    this.populateTable();
    this.dataRefreshService.getMessage().subscribe(message => {
      this.populateTable();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  populateTable(): void {
    this.isLoadingResults = true;
    this.recordService.getRecords().subscribe(records => {
      console.log(records);
      this.dataSource.data = records.records;
    },
    error => {},
    () => this.isLoadingResults = false);
  }
}
