import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Usuario } from './usuario';


@NgModule({
  declarations: [
    Usuario,
  ],
  imports: [
    IonicModule.forRoot(Usuario),
  ],
  exports: [
    Usuario
  ]
})
export class UsuarioModule {}
