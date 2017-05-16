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
public EventoLista: any;
private loader:any;
private id:number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private eventosService: EventProvider,
    public loadingCtrl: LoadingController) {
      this.loader = this.loadingCtrl.create({
      content: "Cargando evento...",
    });
    this.id= navParams.get('item');
  }

  ionViewDidLoad() {
    let evento:any;
    console.log('ionViewDidLoad DetalleEvento');
    this.presentLoading();
    evento=this.getEvento(this.id);
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
        this.hideLoading();
                return result;
      }
    )
  }


}
