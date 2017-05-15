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
public ApiURL:string  = "https://www.lagaleramagazine.es/wp-json";
  constructor(public http: Http) {
    console.log('Hello EventProvider Provider');

  }

  getEvents(){
    return this.http.get(this.ApiURL+"/tribe/events/v1/events").map(res => res.json());
  }
  getEvent(id){
    return this.http.get(this.ApiURL+"/tribe/events/v1/events/"+id).map(res => res.json());
  }

}
