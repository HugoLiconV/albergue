import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Event } from '../_models';

@Injectable()
export class EventResolverService {
  sub: any;
  constructor(
    private eventService: EventsService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Event> {
    const id = route.paramMap.get('id');
    return this.eventService.getEventById(id).pipe();
  }
}
