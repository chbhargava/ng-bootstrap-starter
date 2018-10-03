import { Component, OnInit, AfterViewInit } from '@angular/core';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedInLoginProvider
} from 'angularx-social-login';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  menu: HTMLElement;
  panelMenu: NodeListOf<HTMLElement>;
  panelBoxes: NodeListOf<HTMLElement>;
  signUp: HTMLElement;
  signIn: HTMLElement;

  emailLogin: boolean = false;

  user: any = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private socialAuthService: AuthService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.menu = document.getElementById('menu');
    this.panelMenu = this.menu.querySelectorAll('li');
    this.panelBoxes = document.querySelectorAll('.panel__box');
    this.signUp = document.getElementById('signUp');
    this.signIn = document.getElementById('signIn');
  }

  removeSelection() {
    for (var i = 0, len = this.panelBoxes.length; i < len; i++) {
      this.panelBoxes[i].classList.remove('active');
      this.panelBoxes[i].classList.remove('inactive');
    }
    this.signUp.classList.remove("active");
    this.signIn.classList.remove("active");
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedInLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
            
      }
    );
  }

  onClickSignIn(e) {
    e.preventDefault();
    this.removeSelection();
    this.panelBoxes[0].classList.add('active');
    this.panelBoxes[1].classList.add('inactive');
    this.menu.classList.remove('second-box');
    this.signIn.classList.add("active");
  }

  onClickSignUp(e) {
    e.preventDefault();
    this.removeSelection();
    this.panelBoxes[1].classList.add('active');
    this.panelBoxes[0].classList.add('inactive');
    this.menu.classList.add('second-box');
    this.signUp.classList.add("active");
  }

  signInSubmit() {
    
  }
}
