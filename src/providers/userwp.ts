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
sub: any;

  constructor(public http: Http) {
  }
userLogin(user){
  let json = JSON.stringify(user);
  let params = 'json='+json;
  let headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});

  return this.http.post(this.ApiURL+"/login", params, {headers: headers})
              .map(res => res.json());
}

register(user){
  let json = JSON.stringify(user);
  let params = 'json='+json;
  let headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});

  return this.http.post(this.ApiURL+"/register", params, {headers: headers})
              .map(res => res.json());
  
}
getUserEvents(userId)
{
  let headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});

 /* return this.http.get(this.ApiURL+"/get_user_events/"+userId, {headers: headers})
              .map(res => res.json());*/
  this.sub = this.http.get('/myplace') .map(resp => resp.json()) .subscribe(() => { this.sub.unsubscribe(); });
  
}
getUserCategories(userId)
{
  let headers = new Headers ({'Content-Type':'application/x-www-form-urlencoded'});

  return this.http.get(this.ApiURL+"/get_user_categories/"+userId, {headers: headers})
              .map(res => res.json()).subscribe();
}
lostpass(){
  return this.http
  .get('http://www.lagaleramagazine.es/wp-login.php?action=lostpassword')
  .map(response => response.text())
}
}
