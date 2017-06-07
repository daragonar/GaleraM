import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Login } from "../login/login";
import { UserDataProvider } from "../../providers/user-data";
/**
 * Generated class for the Usuario page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class Usuario {
  user:object;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userD: UserDataProvider) {
this.user = navParams.get('info');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Usuario');
  }
  
  cerrarSesion(){
    this.userD.setUserData(undefined);
    this.userD.setUserEvData(undefined);
    this.userD.setUserCatData(undefined);
    this.navCtrl.setRoot(Login);
    this.navCtrl.parent.select(0);

  }


    
}
