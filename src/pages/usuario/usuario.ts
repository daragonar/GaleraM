import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
this.user = navParams.get('info');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Usuario');
  }
  

    
}
