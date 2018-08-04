import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-timeout',
  template: `<div class="text-center" style="padding-top: 200px; height: 100%;">
  <h1>Your session has timedout! Please login again..</h1>
</div>`,
})
export class SessionTimeoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
