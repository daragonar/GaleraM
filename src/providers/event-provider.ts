import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventProvider {
  public today: any = new Date();
  public ApiURL: string = "https://www.lagaleramagazine.es/wp-json";
  constructor(public http: Http) {
    //console.log('Hello EventProvider Provider');
    this.today = new Date();
    var dd: any = this.today.getDate();
    var mm: any = this.today.getMonth() + 1; //January is 0!
    var yyyy = this.today.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    this.today = yyyy + '-' + mm + '-' + dd;
  }
  getEvents(date, perPage = 50) {
    return this.http.get(this.ApiURL + "/tribe/events/v1/events").map(res => res.json());
  }

  getEventsSlider() {
    return this.http.get(this.ApiURL + "/tribe/events/v1/events?categories=9080").map(res => res.json());
  }
  getEvent(id) {
    return this.http.get(this.ApiURL + "/tribe/events/v1/events/" + id).map(res => res.json());
  }

  getEventsByStartDate(date, page = 1, perPage = 50) {
    //return this.http.get(this.ApiURL+"/tribe/events/v1/events?start_date="+date+"&page="+page).map(res => res.json());
    return this.http.get(this.ApiURL + "/tribe/events/v1/events?start_date=" + date + "&page=" + page).map(res => res.json());
  }
  getEventsByEndDate(date, page = 1, perPage = 50) {
    //return this.http.get(this.ApiURL+"/tribe/events/v1/events?start_date="+date+"&page="+page).map(res => res.json());
    return this.http.get(this.ApiURL + "/tribe/events/v1/events?end_date=" + date + "&page=" + page).map(res => res.json());
  }

  getEventsByRangeDate(sdate, edate, page = 1, perPage = 500) {
    //return this.http.get(this.ApiURL+"/tribe/events/v1/events?start_date="+date+"&page="+page).map(res => res.json());
    return this.http.get(this.ApiURL + "/tribe/events/v1/events?start_date=" + sdate + "&end_date=" + edate + "&per_page=" + perPage + "&page=" + page).map(res => res.json());
  }

  getEventsByCategory(category, sdate = this.today) {
    return this.http.get(this.ApiURL + "/tribe/events/v1/events/?categories=" + category + "&start_date=" + sdate).map(res => res.json());
  }
  getEventsSearch(search) {
    return this.http.get(this.ApiURL + "/tribe/events/v1/events/?search=" + search).map(res => res.json());
  }

  getEventsNextPage(page) {
    return this.http.get(page).map(res => res.json());
  }

  getEventsByRangeDateSum(sdate, edate, page, perPage = 50) {
    return this.http.get(this.ApiURL + "/tribe/events/v1/events?start_date=" + sdate + "&end_date=" + edate + "&per_page=" + perPage + "&page=" + page).map(res => res.json());
  }

}
