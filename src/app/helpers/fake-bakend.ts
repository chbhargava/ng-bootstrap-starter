import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import { URL, USER_ROLE } from '../app.constants';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    dummyTokenHeader = new HttpHeaders({'token' : 'fake-token getemployer_5555555'});

    constructor(private logger: NGXLogger) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.logger.info("FakeBackend:", request.url);
        
        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            if (request.url.indexOf(URL.GET_USER) != -1) {
                let data = {
                    id: 1234,
                    username: 'manishg',
                    firstName: 'Manish Teja',
                    lastName: 'Ganta'
                };
                return Observable.of(new HttpResponse({ status: 200, body: data, headers: this.dummyTokenHeader }));
            }

            else if (request.url.indexOf(URL.REGISTER) != -1) {                
                let resp = {
                    status: 'success',
                    message: 'user created',
                    user_id: 1234
                }
                return Observable.of(new HttpResponse({ status: 200, body: resp }));
            }

            // authenticate
            else if (request.url.indexOf(URL.LOGIN) != -1 && request.method === 'POST') {
                // find if any user matches login credentials
                let userPasswordValid = false;
                if(request.body.user == 'demouser' && request.body.password == 'demopassword') {
                    userPasswordValid = true;
                }
                if (userPasswordValid) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let data = {
                        id: 1234,
                        username: 'demouser',
                        firstName: 'Demo',
                        lastName: 'User'
                    };

                    return Observable.of(new HttpResponse({ status: 200, body: data, headers: this.dummyTokenHeader }));
                } else {
                    // else return 400 bad request
                    return Observable.throw('Username or password is incorrect');
                }
            }

            // pass through any requests not handled above
            return next.handle(request);
            
        })

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(500)
        .dematerialize();
    }
}

export let FakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};