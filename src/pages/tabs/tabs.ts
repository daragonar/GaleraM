import { Component } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability} from '@ionic-native/app-availability';
import { Device } from '@ionic-native/device';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Eventos } from "../eventos/eventos";
import { Login } from "../login/login";
import { Calendario } from "../calendario/calendario";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = Eventos;
  tab5Root = Login;
  tab6Root = Calendario;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    private device:Device,
    public iab:InAppBrowser,
    private appAvailability:AppAvailability,
  ){

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
            this.openInstagram("lagaleramagazine");
          }
        },{
          text: 'Facebook',
          icon:'logo-facebook',
          handler: () => {
            console.log('Facebook');
            this.openFacebook("lagaleramagazine");
          }
        },{
          text: 'Twitter',
          icon: 'logo-twitter',
          handler: () => {
            console.log('Twitter');
            this.openTwitter("lagalera_magazine");
          }
        },{
          text: 'Cerrar',
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

  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
    let app: string;
    if (this.device.platform === 'iOS') {
      app = iosSchemaName;
    } else if (this.device.platform === 'Android') {
      app = androidPackageName;
    } else {
      let browser = this.iab.create(httpUrl + username, '_system');
      return;
    }

    this.appAvailability.check(app).then(
      () => { // success callback
        let browser = this.iab.create(appUrl + username, '_system');
      },
      () => { // error callback
        let browser = this.iab.create(httpUrl + username, '_system');
      }
    );
  }

  openInstagram(username: string) {
    this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'https://www.instagram.com/', username);
  }

  openTwitter(username: string) {
    this.launchExternalApp('twitter://', 'com.twitter.android', 'twitter://user?screen_name=', 'https://twitter.com/', username);
  }

  openFacebook(username: string) {
    this.launchExternalApp('fb://', 'com.facebook.katana', 'fb://profile/', 'https://www.facebook.com/', username);
  }

}
