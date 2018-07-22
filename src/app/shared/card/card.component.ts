import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Output() cardClick = new EventEmitter();
  @Input() id: any;
  constructor() { }
  ngOnInit() {
  }

  handleClick() {
    this.cardClick.emit(this.id);
  }

}
