import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserDataProvider } from "./user-data";

/*
  Generated class for the Userwp provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Userwp {
  public ApiURL: string = "http://www.lagaleramagazine.es/app/index.php";
  public userEvents: any;
  public userCats: any;

  constructor(
    public http: Http,
    public userD: UserDataProvider
  ) {
  }
  userLogin(user) {
    let json = JSON.stringify(user);
    let params = 'json=' + json;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(this.ApiURL + "/login", params, { headers: headers })
      .map(res => res.json());
  }

  register(user) {
    let json = JSON.stringify(user);
    let params = 'json=' + json;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(this.ApiURL + "/register", params, { headers: headers })
      .map(res => res.json());
  }

  getUserEvents(userId) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    if (this.userEvents) {
      return Promise.resolve(this.userEvents);
    }
    return new Promise(resolve => {
      this.http
        .get(this.ApiURL + "/get_user_events/" + userId, { headers: headers })
        .map(response => response.json())
        .subscribe(
          result => {
            this.userEvents = result;
            resolve(this.userEvents);
          }, error => {
            alert("hubo un error");
          }
        );
    });
  }

  setUserEvent(eventId) {
    let eventos = this.userD.getUserEvData();
    console.log("Eventos antes: "+eventos);
    eventos.push(eventId);
    console.log("Eventos despues: "+eventos);
    let userId = this.userD.getUserData()["ID"];
    let json = JSON.stringify(eventId);
    let params = 'json=' + json;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(this.ApiURL + "/update_user_events/"+userId, params, { headers: headers })
      .map(res => res.json())
      .subscribe(
        result => {
          if (!result){
            console.log("Error al seguir el evento, la api ha devuelto false");
          }
        }
      );
  }

  getUserCategories(userId) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    if (this.userCats) {
      return Promise.resolve(this.userCats);
    }
    return new Promise(resolve => {
      this.http
        .get(this.ApiURL + "/get_user_categories/" + userId, { headers: headers })
        .map(response => response.json())
        .subscribe(
          result => {
            this.userCats = result;
            resolve(this.userCats);
          }, error => {
            alert("hubo un error");
          }
        );
    });
  }

  setUserCategory(categoryId) {
    let categorias = this.userD.getUserCatData();
    console.log("Categorias antes: "+categorias);
    categorias.push(categoryId);
    console.log("Categorias despues: "+categorias);
    let userId = this.userD.getUserData()["ID"];
    let json = JSON.stringify(categoryId);
    let params = 'json=' + json;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(this.ApiURL + "/update_user_categories/"+userId, params, { headers: headers })
      .map(res => res.json())      
      .subscribe(
        result => {
          if (!result){
            console.log("Error al seguir el evento, la api ha devuelto false");
          }
        }
      );
  }

  lostpass() {
    return this.http
      .get('http://www.lagaleramagazine.es/wp-login.php?action=lostpassword')
      .map(response => response.text())
  }
}
