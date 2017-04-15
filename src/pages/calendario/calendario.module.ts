import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Calendario } from './calendario';

@NgModule({
  declarations: [
    Calendario,
  ],
  imports: [
    IonicModule.forRoot(Calendario),
  ],
  exports: [
    Calendario
  ]
})
export class CalendarioModule {}
