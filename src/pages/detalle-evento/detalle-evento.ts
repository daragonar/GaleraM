import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
public EventoLista: Array<string>;
private loader:any;
private id:number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private eventosService: EventProvider,
    public loadingCtrl: LoadingController) {
      this.loader = this.loadingCtrl.create({
      content: "Obteniendo Eventos...",
    });
    this.id= navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleEvento');
    this.presentLoading();
    this.getEvento(this.id);
  }
presentLoading() {
    this.loader.present();
  }

  hideLoading(){
    this.loader.dismiss();
  }
  getEvento=function( id ){
    this.eventosService.getEvent(id).subscribe(
      result=>{
        console.log(result);
        this.EventoLista=result.events;
        this.hideLoading();
      }
    )
  }


}
