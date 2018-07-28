import {Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { RecordService } from '../../_services';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  displayedColumns = ['user', 'fecha', 'hora'];
  dataSource = new MatTableDataSource();

  isLoadingResults = true;

  constructor(private recordService: RecordService) {}

  ngOnInit() {
    this.isLoadingResults = true;
    this.recordService.getRecords().subscribe(records => {
      console.log(records);
      this.dataSource.data = records;
    },
    error => {},
    () => this.isLoadingResults = false);
  }
}
