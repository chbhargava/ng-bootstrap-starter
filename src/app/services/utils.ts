import { NGXLogger } from "ngx-logger";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { StorageHelper } from "../helpers/storage-helper";
import { Injectable } from "@angular/core";
import { ROUTE } from "../app.constants";

@Injectable()
export class Utils {

  constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private router: Router) { }

  invokeHttp(url, type = "GET", payload = {}) {
    let httpRsp;
    if(type == "POST") {
      httpRsp = this.http.post<any>(url, payload, { observe: 'response' });
    } else {
      httpRsp = this.http.get<any>(url, { observe: 'response' });
    }
    return httpRsp.map(resp => {
      if (resp.status == 403) {
        this.router.navigate(['/' + ROUTE.SESSION_TIMEOUT]);
        return
      }
      StorageHelper.saveTokenFromResponse(resp);
      let data: any = resp.body;
      return data;
    });
  }

  httpGet(url) {
    return this.invokeHttp(url);
  }

  httpPost(url, postData) {
    return this.invokeHttp(url, "POST", postData);
  }

  getParamsFromUrl(inputURL: string) {
    var query = inputURL;
    var result = {};
    query.split("&").forEach(function (part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }
}