import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EventProvider } from "../../providers/event-provider";


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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eventosService: EventProvider,
    public loadingCtrl: LoadingController) {
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Eventos');
    this.getEventos();
  }

   presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Obteniendo Eventos...",
    });
    loader.present();
  }

  getEventos=function(){
    this.eventosService.getEvents().subscribe(
      result=>{
        this.EventosLista=result.events;
      }
    )
  }

}
