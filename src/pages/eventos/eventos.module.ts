import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Eventos } from './eventos';

@NgModule({
  declarations: [
    Eventos,
  ],
  imports: [
    IonicModule.forRoot(Eventos),
  ],
  exports: [
    Eventos
  ]
})
export class EventosModule {}
