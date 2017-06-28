import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Keyboard } from 'ionic-angular';
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
  public check:string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventosService: EventProvider,
    public loadingCtrl: LoadingController,
    public keyboard: Keyboard) {
    this.loader = this.loadingCtrl.create({
      content: "Obteniendo Eventos...",
    });
    this.EventosLista = [];
    this.searchBox = false;
    this.hideSlide = false;
    this.categoria=null;
  }

  ionViewDidLoad() {
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
    var today = new Date();
    var date = today.getUTCFullYear() + "-" + (today.getUTCMonth() + 1) + "-" + today.getUTCDate();
    this.eventosService.getEventsByStartDate(date).subscribe(
      result => {
        this.EventosLista = result.events;
        this.check = result.next_rest_url;
        this.nextUrl = result.next_rest_url;
        this.hideLoading();
      }
      )
  }

  openMenu = function () {
     this.showMenu === true ? (this.showMenu = false) : (this.showMenu = true);
     this.searchBox = false;
  }

  openSearch = function () {
    this.searchBox === true ? (this.searchBox = false) : (this.searchBox = true);
    this.showMenu = false;
  }

  searchItems = function () {
    this.searchBox=false;
     this.keyboard.close();
    this.EventosLista = [];
    if (this.searchval != "") {
      this.hideSlide=true;
      this.eventosService.getEventsSearch(this.searchval).subscribe(
        result => {
          result.events.forEach(evento => {
            this.EventosLista.push(evento);
          });
          this.nextUrl = result.next_rest_url;
          this.check = result.next_rest_url;
        }
      )
    }else{
      this.hideSlide=false;
    }
  }

  eventTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetalleEvento, {
      item: item
    });
  }

  categoryTapped(category) {
    this.EventosLista = [];
    this.categoria = category;
    this.hideSlide=true;
    this.eventosService.getEventsByCategory(this.categoria).subscribe(
      result => {
        this.EventosLista = result.events;
        this.nextUrl = result.next_rest_url;
        this.check = result.next_rest_url;
        this.nextUrl += "&categories=" + this.categoria;
      }
    )
  }

  doInfinite = function (event) {
    //console.log("ckeck = "+this.check);
    if (this.check != undefined) { //Comprobamos si hay más páginas
      this.eventosService.getEventsNextPage(this.nextUrl).subscribe(
        result => {
          console.log(this.nextUrl);
          result.events.forEach(evento => {
            this.EventosLista.push(evento);
          });
          this.nextUrl = result.next_rest_url;
          this.check = result.next_rest_url;
          if (this.categoria!=null) {
            this.nextUrl += "&categories=" + this.categoria;
          }
          event.complete();
        }
      )
    }else{
      //console.log("NO hay más páginas");
      event.complete();
    }
  }


}
