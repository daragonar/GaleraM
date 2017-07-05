import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { Userwp } from "../providers/userwp";
import { UserDataProvider } from "../providers/user-data";
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  private storeData: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: NativeStorage,
    private userWp: Userwp,
    private userD: UserDataProvider,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      statusBar.styleLightContent();
      statusBar.backgroundColorByHexString('#000');

      this.storage.getItem('myForm').then(
        data => {
         
          if (data != null) {
              this.storeData = data;
              this.userWp.userLogin(this.storeData).subscribe(
                  result => {
                    this.userD.setUserData(result.data);
                    if (result.code == 200) {
                      console.log("Autologin!");
                      this.userWp.getUserEvents(result.data.ID).then(data => {
                        console.log("entra en getUserEvents");
                        if (data) {
                            this.userD.setUserEvData(data);
                        }
                        else {
                            let userEvFav = [];
                            this.userD.setUserEvData(userEvFav);
                            console.log("No hay eventos!");
                        }
                      });

                      this.userWp.getUserCategories(result.data.ID).then(data => {
                          console.log("entra en getUserCategories");
                          if (data) {
                              this.userD.setUserCatData(data);
                              console.log(data);
                          }
                          else {
                              let userCatFav = [];
                              this.userD.setUserCatData(userCatFav);
                              console.log("No hay categorías!");
                          }
                      });
                    }
                  }
              )
          }
        },error => console.error(error)
      );

      splashScreen.hide();
    });
  }
}