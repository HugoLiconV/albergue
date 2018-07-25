import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {

  @Input() subject;
  email = 'alberge@gmail.com';
  phone = '614 123 4567';
  emailLink = `mailto:${this.email}?subject=${this.subject}`
  constructor() { }

  ngOnInit() {
  }

}
