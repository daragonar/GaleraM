import { Component } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';


import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Eventos } from "../eventos/eventos";
import { Usuario } from "../usuario/usuario";
import { Calendario } from "../calendario/calendario";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = Eventos;
  tab5Root = Usuario;
  tab6Root = Calendario;

  constructor(public actionSheetCtrl: ActionSheetController) {
  }  

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Siguenos en redes sociales',
      buttons: [
        {
          text: 'Instagram',
          icon: 'instagram',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Facebook',
          icon: 'facebook',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Twitter',
          icon: 'twitter',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
