import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  template: `
  <main [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
    <router-outlet #o="outlet"></router-outlet>
  </main>
  <ngx-loading-bar [includeBar]='true' [includeSpinner]='false'></ngx-loading-bar>`,
  animations: [fadeAnimation]
})

export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit() {
   
  }
}
