/**
 * 
 */

const TOKEN_KEY: string = "tcc_auth_token";
const RESP_TOKEN_KEY: string = "token";

export class StorageHelper {
  static get(key): string {
    return localStorage.getItem(key);
  }
  static set(key, value): void {
    localStorage.setItem(key, value);
  }

  static getToken(): string {
    return this.get(TOKEN_KEY);
  }

  static setToken(value): void {
    this.set(TOKEN_KEY, value);
  }

  static saveTokenFromResponse(resp): void {
    let token = resp.headers.get(RESP_TOKEN_KEY);
    if(token != undefined && token != null) {
      this.setToken(token);
    }
  }
}