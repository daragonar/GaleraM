import { Userwp } from './../../providers/userwp';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserDataProvider } from "../../providers/user-data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inicio="";

  constructor(
    public navCtrl: NavController,
    public userD: UserDataProvider,
    public userwp:Userwp,
  ) {
    this.userwp.cargaInicio().subscribe(data => this.inicio = data.content.rendered
      ) 
  }

  ionViewWillEnter() {
  }
}
