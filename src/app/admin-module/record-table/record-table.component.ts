import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RecordService, DataRefreshService } from '../../_services';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['user', 'fecha', 'hora'];
  dataSource = new MatTableDataSource();
  isLoadingResults = true;

  messageSubscription: ISubscription;
  getSubscription: ISubscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private recordService: RecordService,
    private dataRefreshService: DataRefreshService) {
  }

  ngOnInit() {
    this.populateTable();
    this.messageSubscription = this.dataRefreshService.getMessage().subscribe(message => {
      this.populateTable();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  populateTable(): void {
    this.isLoadingResults = true;
    this.getSubscription =  this.recordService.getRecords().subscribe(records => {
      this.dataSource.data = records.records;
    },
    error => {},
    () => this.isLoadingResults = false);
  }

  ngOnDestroy(): void {
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
