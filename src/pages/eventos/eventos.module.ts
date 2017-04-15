import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Eventos } from './eventos';
import { NgCalendarModule  } from 'ionic2-calendar';


@NgModule({
  declarations: [
    Eventos,
  ],
  imports: [    
    NgCalendarModule,
    IonicModule.forRoot(Eventos),
  ],
  exports: [
    Eventos
  ]
})
export class EventosModule {}
