import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  template: `
  <ngx-loading-bar [includeBar]='true' [includeSpinner]='false'></ngx-loading-bar>
  <div [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
    <router-outlet #o="outlet"></router-outlet>    
  </div>`,
  animations: [fadeAnimation]
})

export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit() {
   
  }
}
