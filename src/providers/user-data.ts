import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserDataProvider {
private user:any;
private favEv:any;
private favCat:any;
  constructor() {
  }

setUserData(data){
  this.user=data;
}
getUserData(){
  return this.user
}
setUserEvData(data){
  this.favEv=data;
}
getUserEvData(){
  return this.favEv
}
setUserCatData(data){
  this.favCat=data;
}
getUserCatData(){
  return this.favCat
}
}
