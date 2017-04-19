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
          icon : 'logo-instagram',
          handler: () => {
            console.log('Instagram');
          }
        },{
          text: 'Facebook',
          icon:'logo-facebook',
          handler: () => {
            console.log('Facebook');
          }
        },{
          text: 'Twitter',
          icon: 'logo-twitter',
          handler: () => {
            console.log('Twitter');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cerrar');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
