import { Injectable } from '@angular/core';
import * as _moment from 'moment';

@Injectable()
export class ChartService {

  constructor() { }

  getPeriodQuery(period, previous = 0) {
    let startDate;
    let endDate;
    let query: QueryBuilder;
    switch (period) {
      case 'today':
        startDate = _moment().subtract(previous, 'days').startOf('day').toISOString();
        endDate   = _moment().subtract(previous, 'days').endOf('day').toISOString();
        break;

      case 'week':
        startDate = _moment().subtract(previous, 'weeks').startOf('week').toISOString();
        endDate   = _moment().subtract(previous, 'weeks').endOf('week').toISOString();
        break;

      case 'month':
        startDate = _moment().subtract(previous, 'months').startOf('month').toISOString();
        endDate   = _moment().subtract(previous, 'months').endOf('month').toISOString();
        break;

      case 'year':
        startDate = _moment().subtract(previous, 'years').startOf('year').toISOString();
        endDate   = _moment().subtract(previous, 'years').endOf('year').toISOString();
        break;
    }
    query = new QueryBuilder.Builder().afterDate(startDate).beforeDate(endDate).build();
    return query.getQuery();
  }
}

export class QueryBuilder {
  before: string;
  after: string;
  constructor(build) {
    this.before = build.before;
    this.after = build.after;
  }
  getQuery(): string {
    let query = '';
    query += this.before ? `before=${this.before}&` : '';
    query += this.after ? `after=${this.after}&` : '';
    return query;
  }
   static get Builder() {
    class Builder {
      private before;
      private after;

      beforeDate(date: Date) {
        this.before = date;
        return this;
      }
      afterDate(date: Date) {
        this.after = date;
        return this;
      }
      build() {
        return new QueryBuilder(this);
      }
    }
    return Builder;
  }
}
