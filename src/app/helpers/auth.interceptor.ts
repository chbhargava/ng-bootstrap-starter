import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StorageHelper } from './storage-helper';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: StorageHelper, private logger: NGXLogger) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.logger.info("AuthInterceptor:", request.url);

    // Send token except for login & get user role: 
    if (request.url.indexOf('/auth') == -1) {
      // add authorization header with jwt token if available
      let token = StorageHelper.getToken();
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: token
          }
        });
      }
    }
    return next.handle(request);
  }
}