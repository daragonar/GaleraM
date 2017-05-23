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
  private loader: any;
  public searchBox: any;
  public nextUrl: string;
  public searchval: string;
  public hideSlide: boolean;
  public categoria: number;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventosService: EventProvider,
    public loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create({
      content: "Obteniendo Eventos...",
    });
    this.EventosLista = [];
    this.searchBox = false;
    this.hideSlide = false;
    this.categoria=null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Eventos');
    this.presentLoading();
    this.getEventos();
  }

  presentLoading() {
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

  getEventos = function () {
    this.EventosLista = [];
    this.eventosService.getEvents().subscribe(
      result => {
        this.EventosLista = result.events;
        this.nextUrl = result.next_rest_url;
        this.hideLoading();
      }
    )
  }

  openMenu = function () {
    this.EventosLista = [];
    this.categoria = 294;
    this.eventosService.getEventsByCategory(this.categoria).subscribe(
      result => {
        this.EventosLista = result.events;
        this.nextUrl = result.next_rest_url;
        this.nextUrl += "&categories=" + this.categoria;
      }
    )

  }

  openSearch = function () {
    this.searchBox === true ? (this.searchBox = false) : (this.searchBox = true)
  }

  searchItems = function () {
    this.EventosLista = [];
    if (this.searchval != "") {
      this.eventosService.getEventsSearch(this.searchval).subscribe(
        result => {
          result.events.forEach(evento => {
            this.EventosLista.push(evento);
            console.log(evento)
            console.log(this.EventosLista.length)
          });
          this.nextUrl = result.next_rest_url;
        }
      )
    }
  }

  eventTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetalleEvento, {
      item: item
    });
  }

  doInfinite = function (event) {
    if (this.nextUrl!= 'undefined') {
      this.eventosService.getEventsNextPage(this.nextUrl).subscribe(
        result => {
          result.events.forEach(evento => {
            this.EventosLista.push(evento);
          });
          this.nextUrl = result.next_rest_url;
          if (this.categoria!=null) {
            this.nextUrl += "&categories=" + this.categoria;
          }
          event.complete();
        }
      )
    }
    console.log(this.nextUrl);

  }


}
