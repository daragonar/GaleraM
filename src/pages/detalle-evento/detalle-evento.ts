import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  /*getEvento=function( id ){
    this.eventosService.getEvent(id).subscribe(
      result=>{
        console.log(result);
        this.hideLoading();
                return result;
      }
    )
  }*/


}
