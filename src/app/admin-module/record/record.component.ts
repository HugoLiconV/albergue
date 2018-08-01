import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { RecordService } from '../../_services';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['user', 'fecha', 'hora'];
  dataSource = new MatTableDataSource();
  isLoadingResults = true;

  constructor(private recordService: RecordService) {}

  ngOnInit() {
    this.populateTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
