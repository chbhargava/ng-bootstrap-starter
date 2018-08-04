import { Injectable } from "@angular/core";

import * as jwt_decode from "jwt-decode";
import { StorageHelper } from '../helpers/storage-helper';
import { NGXLogger } from 'ngx-logger';
import { URL } from '../app.constants';
import { Utils } from './utils';
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {

  constructor(private utils: Utils, private logger: NGXLogger) { }

  getToken(): string {
    return StorageHelper.getToken();
  }

  setToken(token: string): void {
    StorageHelper.setToken(token);
  }

  getTokenExpirationDate(token: string): Date {
    if (!environment.production && token.split(" ")[0] == 'fake-token') {
      let date = new Date();
      return new Date(date.getTime() + 10 * 60000);
    }

    // First split, becasue from the server we are getting "Bearer <>"
    token = token.split(" ")[1];
    const decoded = jwt_decode(token);
    if (decoded['exp'] === undefined) {
      return null;
    }

    this.logger.info("Token expires at: ", decoded['exp']);
    const date = new Date(0);
    date.setUTCSeconds(decoded['exp']);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token || token == undefined || token == '' || token == null) return true;
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }  
}