import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
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
  public userImage: any;

  constructor(
    private transfer: Transfer,
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
   /* if (this.userEvents) {
      return Promise.resolve(this.userEvents);
    }*/
    return new Promise(resolve => {
      this.http
        .get(this.ApiURL + "/get_user_events/" + userId, { headers: headers })
        .map(response => response.json())
        .subscribe(
          result => {
            this.userEvents = result[0];
            resolve(this.userEvents);
          }, error => {
            alert("hubo un error");
          }
        );
    });
  }

  setUserEvent(id, title, start_date, end_date, category, image) {
    var eventos = this.userD.getUserEvData();
    var sw=0;
    var i=0;
    eventos.forEach(element =>{
        if(id==element.id){
          sw=1;
           eventos.splice(eventos.indexOf(element), 1);
        }
        i++;
    });

    if(sw==0){
      var evento = {
        'id': id,
        'title': title,
        'start_date': start_date,
        'end_date': end_date,
        'category': category,
        'image': image
      };
      eventos.push(evento);
    }
    let userId = this.userD.getUserData()["ID"];
    let json = encodeURIComponent(JSON.stringify(eventos));
    let params = 'json=' + json;

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(this.ApiURL + "/update_user_events/"+userId, params, { headers: headers })
      .map(res => res.json())
      .subscribe(
        result => {
          if (!result){
            console.log("Error al seguir el evento, la api ha devuelto false/null");
          }else{
            
          }
        }
      );
  }

  getUserCategories(userId) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    /*if (this.userCats) {
      return Promise.resolve(this.userCats);
    }*/
    return new Promise(resolve => {
      this.http
        .get(this.ApiURL + "/get_user_categories/" + userId, { headers: headers })
        .map(response => response.json())
        .subscribe(
          result => {
            this.userCats = result[0];
            resolve(this.userCats);
          }, error => {
            alert("hubo un error");
          }
        );
    });
  }

  setUserCategory(categoryId) {
    let categorias = this.userD.getUserCatData();
    if(categorias.indexOf(categoryId) == -1){
      //Seguir la categoria
      categorias.push(categoryId);
    }else{
      //Dejar de seguir la categoria
      categorias.splice(categorias.indexOf(categoryId), 1);
    }
    console.log("Categorias favoritas: "+categorias);
    let userId = this.userD.getUserData()["ID"];
    let json = JSON.stringify(categorias);
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


 getUserImage() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let userId = this.userD.getUserData()["ID"];
    return this.http.get(this.ApiURL + "/get_user_image/" + userId, { headers: headers }).map(response => response.json());
  }

  setUserImage(imageData) {
    let userId = this.userD.getUserData()["ID"];
    const fileTransfer: TransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: userId+'.jpg',
      mimeType: 'image/jpg',
      chunkedMode: false,
      headers: {Connection: "close"},
    }

    fileTransfer.upload(imageData, this.ApiURL + "/update_user_image/"+userId, options).then((data) => {
      return (data);
    }, (err) => {
      console.log("ERROR: "+err);
    });
  }

  cargaInicio(){
    return this.http
      .get('http://lagaleramagazine.es/wp-json/wp/v2/pages/24288')
      .map(response => response.json())
  }
}
