import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RecordService, FormatDateService } from '../../_services';

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
    private formatDateService: FormatDateService) {
  }

  ngOnInit() {
    this.populateTable();
  }

  formatDate(date) {
    return this.formatDateService.formatDate(date);
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
