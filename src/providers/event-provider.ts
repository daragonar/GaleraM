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
    //console.log('Hello EventProvider Provider');
  }

  getEvents( date, perPage=50){
    return this.http.get(this.ApiURL+"/tribe/events/v1/events").map(res => res.json());
  }
  getEvent(id){
    return this.http.get(this.ApiURL+"/tribe/events/v1/events/"+id).map(res => res.json());
  }

  getEventsByStartDate(date, page=1, perPage=50){
    //return this.http.get(this.ApiURL+"/tribe/events/v1/events?start_date="+date+"&page="+page).map(res => res.json());
    return this.http.get(this.ApiURL+"/tribe/events/v1/events?start_date="+date+"&page="+page).map(res => res.json());
  }
getEventsByEndDate(date, page=1, perPage=50){
    //return this.http.get(this.ApiURL+"/tribe/events/v1/events?start_date="+date+"&page="+page).map(res => res.json());
    return this.http.get(this.ApiURL+"/tribe/events/v1/events?end_date="+date+"&page="+page).map(res => res.json());
  }

getEventsByRangeDate(sdate, edate , page=1, perPage=50){
    //return this.http.get(this.ApiURL+"/tribe/events/v1/events?start_date="+date+"&page="+page).map(res => res.json());
    return this.http.get(this.ApiURL+"/tribe/events/v1/events?start_date="+sdate+"&end_date="+edate+"&per_page="+perPage+"&page="+page).map(res => res.json());
  }
getEventsByCategory(category){
 return this.http.get(this.ApiURL+"/tribe/events/v1/events/?categories="+category).map(res => res.json());
}
getEventsSearch(search){
    return this.http.get(this.ApiURL+"/tribe/events/v1/events/?search="+search).map(res => res.json());
  }

getEventsNextPage(page){
return this.http.get(page).map(res => res.json());
}

}
