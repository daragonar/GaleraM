import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Usuario } from './usuario';
import { NgCalendarModule  } from 'ionic2-calendar';


@NgModule({
  declarations: [
    Usuario,
  ],
  imports: [
    NgCalendarModule,
    IonicModule.forRoot(Usuario),
  ],
  exports: [
    Usuario
  ]
})
export class UsuarioModule {}
