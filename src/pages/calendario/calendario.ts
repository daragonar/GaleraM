import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EventProvider } from "../../providers/event-provider";
import { DetalleEvento } from "../detalle-evento/detalle-evento";

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
    eventSource;
    loader;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    };

    markDisabled = (date: Date) => {
        var current = new Date();
        current.setDate(current.getDate() - 1);
        console.log(current);
        return date < current;
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, private eventosService: EventProvider,
        public loadingCtrl: LoadingController) {
        this.loader = this.loadingCtrl.create({
            content: "Obteniendo Eventos...",
        });

    }

    ionViewDidLoad() {
        this.loadEvents();
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    today() {
        this.calendar.currentDate = new Date();
    }

    loadEvents() {
        this.presentLoading();
        this.eventSource = this.cargarEventos();
    }

    cargarEventos() {
        var date = new Date();
        var fecha= date.getUTCFullYear()+"-"+date.getUTCMonth()+"-"+date.getUTCDate();
        //var fecha= "2017-01-15";
        console.log(fecha);
        var eventsCalendar = [];
        this.eventosService.getEventsByDate(fecha).subscribe(
            result => {
                this.hideLoading();
                
                result.events.forEach(function (evento) {
                console.log(evento)
                    eventsCalendar.push({
                    startTime:new Date(evento.start_date),
                    endTime:new Date(evento.end_date),
                    title: evento.title,
                    allDay: evento.all_day,
                    id: evento.id,
                    image: evento.image.sizes.thumbnail.url,
                    item:evento
                    })
                });
                this.calendar.currentDate=new Date();
            }
        )
        return eventsCalendar;
    }
    /*loadEvents() {
        this.eventSource = this.createRandomEvents();
    }*/
    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true,
                    id: i,
                    image: "http://lorempixel.com/150/150/"
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false,
                    id: i,
                    image: "http://lorempixel.com/150/150/"
                });
            }
        }
        this.hideLoading();
        return events;
    }
    eventSelected(events, item) {
        this.navCtrl.push(DetalleEvento, {
            item: item
        });
    }
    presentLoading() {
        this.loader.present();
    }

    hideLoading() {
        this.loader.dismiss();
    }

}
