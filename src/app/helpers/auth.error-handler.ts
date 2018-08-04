
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ROUTE } from '../app.constants';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private logger: NGXLogger) { }

  handleError(error) {

    if (error != undefined || error != null){
      if (error.status === 401 || error.status === 403) {
        this.logger.error("Auth error", error);
        const router = this.injector.get(Router);
        router.navigate(['/' + ROUTE.SESSION_TIMEOUT]);
      } else if (error.status === 502) {
        this.logger.error("Proxy error", error);
      }
    }
    throw error;
  }
}