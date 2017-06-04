import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserDataProvider } from "../../providers/user-data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public userD: UserDataProvider) {

  }

ionViewWillEnter()
{
  console.log(this.userD.getUserData());
console.log("Segunda salida");
console.log(this.userD.getUserEvData());


  
}
}
