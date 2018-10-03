
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { ROUTE } from '../app.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userAuthService: UserAuthService) { }

  canActivate() {
    if (!this.userAuthService.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/' + ROUTE.SESSION_TIMEOUT]);
    return false;
  }

}