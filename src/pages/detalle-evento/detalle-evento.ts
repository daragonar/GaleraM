import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderForwardResult  } from '@ionic-native/native-geocoder';
import { EventProvider } from "../../providers/event-provider";


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
  private latitude:number;
  private longitude:number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eventosService: EventProvider,
    public loadingCtrl: LoadingController,
    private googleMaps: GoogleMaps,
    private converGeocoder: NativeGeocoder) {
    this.loader = this.loadingCtrl.create({
      content: "Cargando evento...",
    });
    this.evento = navParams.get('item');
    console.log(this.evento);
    this.converGeocoder.forwardGeocode(this.evento.venue.address)
    .then((coordinates: NativeGeocoderForwardResult) => console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude))
    .catch((error: any) => console.log(error));
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  ionViewDidLoad() {
    /*let evento:any;
    console.log('ionViewDidLoad DetalleEvento');
    this.presentLoading();
    evento=this.getEvento(this.id);*/
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
    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );

    // create LatLng object
    let posicion: LatLng = new LatLng(43.0741904,-89.3809802);

    // create CameraPosition
    let cameraPosition: CameraPosition = {
      target: posicion,
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(cameraPosition);

    // create new marker
    let markerOptions: MarkerOptions = {
      position: posicion,
      title: 'Mapa'
    };

    const marker = map.addMarker(markerOptions)
      .then((marker: Marker) => {
          marker.showInfoWindow();
        });
    }
}
