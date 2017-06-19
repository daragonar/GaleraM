import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { EventProvider } from "../../providers/event-provider";
import { SocialSharing } from "@ionic-native/social-sharing";


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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eventosService: EventProvider,
    public loadingCtrl: LoadingController,
    private googleMaps: GoogleMaps,
    private converGeocoder: NativeGeocoder,
    private socialSharing: SocialSharing) {
    this.loader = this.loadingCtrl.create({
      content: "Cargando evento...",
    });
    this.evento = navParams.get('item');
    console.log(this.evento);
  }

  compartir() {
    this.socialSharing.share(this.evento.title, "Comparte el evento de La Galera Magazine", this.evento.image.url, this.evento.url).
      then(() => {
        alert("Sharing success");
        // Success!
      }).catch(() => {
        // Error!
        alert("Share failed");
      });
  }
  ngAfterViewInit() {
    this.loadMap();
  }

  presentLoading() {
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
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
