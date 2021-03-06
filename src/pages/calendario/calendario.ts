import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { EventProvider } from "../../providers/event-provider";
import { DetalleEvento } from "../detalle-evento/detalle-evento";
import { Login } from "../login/login";
import { Userwp } from "../../providers/userwp";
import { UserDataProvider } from "../../providers/user-data";

/**
 * Generated class for the Calendario page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-calendario',
    templateUrl: 'calendario.html',
    providers: [EventProvider]

})
export class Calendario {
    eventSource: any = [];
    loader;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        noEventsLabel: 'Sin eventos',
        currentDate: new Date(),
        startingDayWeek: 1,
        startingDayMonth: 1,
        formatDayHeader: 'E',
    };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private eventosService: EventProvider,
        public loadingCtrl: LoadingController,
        private userWp: Userwp,
        public userD: UserDataProvider,
        public AlertMsg: AlertController
    ) {

    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onRangeChanged = (ev: { startTime: Date, endTime: Date }) => {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
        this.cargarEventos(ev.startTime, ev.endTime);
    }
    today() {
        var date = new Date();
        date.setHours(0, 0, 0)
        this.calendar.currentDate = date;
    }

    cargarEventos(date1, date2) {
        this.eventSource=[];
        var sdate = date1.getUTCFullYear() + "/" + (date1.getUTCMonth() + 1) + "/" + date1.getUTCDate() + " 00:00:00";
        var edate = date2.getUTCFullYear() + "/" + (date2.getUTCMonth() + 1) + "/" + date2.getUTCDate() + " 23:59:59";
        let loader = this.loadingCtrl.create({
            content: "Obteniendo Eventos...",
        });
        loader.present().then(() => {
            this.eventosService.getEventsByRangeDate(sdate, edate).subscribe(
                result => {
                    var totPag = result.total_pages;
                    for (var pag = 1; pag <= totPag; pag++) {
                        this.eventosService.getEventsByRangeDateSum(sdate, edate, pag).subscribe(resultSum => {
                            var eventsCalendar = [];
                            resultSum.events.forEach(function (evento) {
                                //console.log(evento);
                                var categoria=(evento.categories[0].slug!='recomendado'?evento.categories[0]:evento.categories[1]);
                                eventsCalendar.push({
                                    startTime: new Date(evento.start_date.replace(/-/g, '/')),
                                    endTime: new Date(evento.end_date.replace(/-/g, '/')),
                                    title: evento.title,
                                    allDay: evento.all_day,
                                    id: evento.id,
                                    image: (evento.image ? evento.image.sizes.thumbnail.url : 'assets/img/thumb.png'),
                                    address: (evento.venue.venue ? evento.venue.venue + ", " + evento.venue.address : ''),
                                    category_id: categoria.id,
                                    category_slug: categoria.slug,
                                    category_item_style: "item_" + categoria.slug,
                                    category_name: categoria.name,
                                    item: evento
                                })
                            });
                            this.eventSource = this.eventSource.concat(eventsCalendar);
                            if (this.eventSource.length == resultSum.total)
                            {
                                loader.dismiss().then(() => {
                                    console.log("Loading dismissed");
                                });
                            }
                        },error=>{
                                alert("Ha habido un error en la carga de eventos")
                                loader.dismiss().then(() => {
                                    console.log("Loading dismissed");
                                });})
                    }
                }
            )
        });
    }

    eventSelected(events, item) {
        this.navCtrl.push(DetalleEvento, {
            item: item
        });
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
                            this.navCtrl.parent.select(3);
                        }
                    }
                ]
            });
            alert.present();
        }
    }

    isFollowedEvent(id_evento) {
        if (this.userD.getUserEvData() != undefined) {
            var eventos = this.userD.getUserEvData();
            //console.log(eventos);
            var sw = 0;
            eventos.forEach(element => {
                if (id_evento == element.id) {
                    sw = 1;
                }
            });
            if (sw == 1) {
                return true;
            } else {
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
                            this.navCtrl.parent.select(3);
                        }
                    }
                ]
            });
            alert.present();
        }
    }

    isFollowedCategory(id_categoria) {
        if (this.userD.getUserData() != undefined) {
            if (this.userD.getUserCatData().indexOf(id_categoria) != -1) {
                return true;
            } else {
                return false;
            }
        }
    }

}
