import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EventProvider } from "../../providers/event-provider";
import { DetalleEvento } from "../detalle-evento/detalle-evento";


/**
 * Generated class for the Eventos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
  providers: [EventProvider]
})
export class Eventos {
public EventosLista: Array<string>;
private loader:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eventosService: EventProvider,
    public loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create({
      content: "Obteniendo Eventos...",
    });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Eventos');
    this.presentLoading();
    this.getEventos();
  }

   presentLoading() {
    this.loader.present();
  }

  hideLoading(){
    this.loader.dismiss();
  }

  getEventos=function(){
    this.eventosService.getEvents().subscribe(
      result=>{
        this.EventosLista=result.events;
        this.hideLoading();
      }
    )
  }

  eventTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetalleEvento, {
      item: item
    });
  }

}
