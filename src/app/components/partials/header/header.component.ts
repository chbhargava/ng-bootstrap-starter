import { Component, OnInit } from '@angular/core';
import { APP_TITLE } from '../../../app.constants';

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  appTitle = APP_TITLE;

  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
