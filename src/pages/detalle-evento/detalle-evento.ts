import { DateFormatPipe } from 'angular2-moment';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { EventProvider } from "../../providers/event-provider";
import { Login } from "../login/login";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Userwp } from "../../providers/userwp";
import { UserDataProvider } from "../../providers/user-data";

/**
 * Generated class for the DetalleEvento page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detalle-evento',
  templateUrl: 'detalle-evento.html',
  providers: [EventProvider]
})
export class DetalleEvento {
    public evento: any;
    private loader: any;
    private posicion: LatLng;
    private sdate;
    private stime;
    private edate;
    private etime;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private eventosService: EventProvider,
      public loadingCtrl: LoadingController,
      private userWp: Userwp,
      public userD: UserDataProvider,
      private googleMaps: GoogleMaps,
      private converGeocoder: NativeGeocoder,
      public AlertMsg: AlertController,
      private socialSharing: SocialSharing,
      private dfp: DateFormatPipe,
  ) {
      this.loader = this.loadingCtrl.create({
          content: "Cargando evento...",
      });
      this.evento = navParams.get('item');
      //console.log(this.evento);
  }

  compartir() {
    this.socialSharing.share(this.evento.title, "Comparte el evento de La Galera Magazine", this.evento.image.url, this.evento.url).
      then(() => {
      }).catch(() => {
        // Error!
        alert("Ha fallado al compartir");
      });
  }

  /*ngAfterViewInit() {
    this.loadMap();
  }*/

 ionViewDidLoad() {
    this.sdate = this.dfp.transform(this.evento.start_date, 'D MMMM, Y');
    this.edate = this.dfp.transform(this.evento.end_date, 'D MMMM, Y');

    this.stime = this.dfp.transform(this.evento.start_date, 'HH:mm');
    this.etime = this.dfp.transform(this.evento.end_date, 'HH:mm');
    this.loadMap();
}

  presentLoading() {
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

  followEvent(id, title, start_date, end_date, category, image) {
      //Si no está logueado añadir esto
      if (this.userD.getUserData() != undefined) {
          this.userWp.setUserEvent(id, title, start_date, end_date, category, image);
      } else {
          // Import the AlertController from ionic package 
          // Consume it in the constructor as 'alertCtrl' 
          let alert = this.AlertMsg.create({
              title: 'La Galera Magazine',
              message: 'Si quieres guardar tus favoritos no dudes en registrarte o loguearte si ya tienes una cuenta',
              buttons: [
                  {
                      text: 'Cancelar', role: 'cancel',
                      handler: () => {
                          console.log('Cancel clicked');
                      }
                  }, {
                      text: 'Login',
                      handler: () => {
                          this.navCtrl.push(Login);
                      }
                  }
              ]
          });
          alert.present();
      }
  }

  isFollowedEvent(id_evento){
      if (this.userD.getUserEvData()!=undefined) {
          var eventos = this.userD.getUserEvData();
          //console.log(eventos);
          var sw=0;
          eventos.forEach(element => {
              if(id_evento==element.id){
                  sw=1;
              }
          });
          if(sw==1){
              return true;
          }else{
              return false;
          }
      }
  }

    followCategory(id_categoria) {
      //Si no está logueado añadir esto
      if (this.userD.getUserData() != undefined) {
          this.userWp.setUserCategory(id_categoria);
      } else {
          // Import the AlertController from ionic package 
          // Consume it in the constructor as 'alertCtrl' 
          let alert = this.AlertMsg.create({
              title: 'La Galera Magazine',
              message: 'Si quieres guardar tus favoritos no dudes en registrarte o loguearte si ya tienes una cuenta',
              buttons: [
                  {
                      text: 'Cancelar', role: 'cancel',
                      handler: () => {
                          console.log('Cancel clicked');
                      }
                  }, {
                      text: 'Login',
                      handler: () => {
                          this.navCtrl.push(Login);
                      }
                  }
              ]
          });
          alert.present();
      }
  }

  isFollowedCategory(id_categoria){
      if (this.userD.getUserData() != undefined) {
          if(this.userD.getUserCatData().indexOf(id_categoria) != -1){
              return true;
          }else{
              return false;
          }
      }
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.converGeocoder.forwardGeocode(this.evento.venue.address + ", " + this.evento.venue.city + ", " + this.evento.venue.province)
        .then((coordinates: NativeGeocoderForwardResult) => {
          console.log(coordinates.latitude, coordinates.longitude);
          this.posicion = new LatLng(Number(coordinates.latitude), Number(coordinates.longitude));

          // create CameraPosition
          let cameraPosition: CameraPosition = {
            target: this.posicion,
            zoom: 18,
            tilt: 30
          };

          // move the map's camera to position
          map.moveCamera(cameraPosition);

          // create new marker
          let markerOptions: MarkerOptions = {
            position: this.posicion,
            title: this.evento.venue.venue
          };

          const marker = map.addMarker(markerOptions)
            .then((marker: Marker) => {
              marker.showInfoWindow();
            });

        })
        .catch((error: any) => console.log(error));

      console.log('Map is ready!');
      // Now you can add elements to the map like the marker
    });
  }
}
