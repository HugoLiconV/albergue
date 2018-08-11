import { Record } from './record';
import { Person } from './person';

export class RecordResponse {
  records: Record[];
  stats: Stats[];
}

export class Stats {
  count: number;
  user: Person;
}
