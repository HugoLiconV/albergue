import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'; // <-- do not forget to import
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../navbar.css']
})
export class NavbarComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router ) {
  }

onAnchorClick ( ) {
    this.route.fragment.subscribe ( f => {
      const element = document.querySelector ( '#' + f );
      if (element) {
        element.scrollIntoView();
      }
    });
  }

ngOnInit() {
    this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) { element.scrollIntoView(); }
        }
      }
    });
  }

}
