import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Userwp provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Userwp {
public ApiURL:string  = "http://www.lagaleramagazine.es/app/index.php";

  constructor(public http: Http) {
  }
userLogin(user){
  let json = JSON.stringify(user);
  let params = 'json='+json;
  let headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});

  return this.http.post(this.ApiURL+"/user", params, {headers: headers})
              .map(res => res.json());
}

register(user){
  let json = JSON.stringify(user);
  let params = 'json='+json;
  let headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});

  return this.http.post(this.ApiURL+"/register", params, {headers: headers})
              .map(res => res.json());
}

}
