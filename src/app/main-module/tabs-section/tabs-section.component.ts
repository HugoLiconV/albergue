import {Component, OnInit, Input} from '@angular/core';
import {Event} from '../../_models';

@Component({
  selector: 'app-tabs-section',
  templateUrl: './tabs-section.component.html',
  styleUrls: ['./tabs-section.component.css']
})
export class TabsSectionComponent implements OnInit {
  selectedIndex: number | null;

  constructor() {
  }

  ngOnInit() {
  }

  handleChildButtonClick(event: Event) {
    console.log('received: ' + event.id);
  }
}
