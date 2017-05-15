import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DetalleEvento } from './detalle-evento';

@NgModule({
  declarations: [
    DetalleEvento,
  ],
  imports: [
    IonicModule.forRoot(DetalleEvento),
  ],
  exports: [
    DetalleEvento
  ]
})
export class DetalleEventoModule {}
