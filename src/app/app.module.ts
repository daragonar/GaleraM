import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { GoogleMaps } from '@ionic-native/google-maps';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability} from '@ionic-native/app-availability';
import { Device } from '@ionic-native/device';
import { MyApp } from './app.component';
import { SafePipe } from '../pipes/safe';
import { RemoveTags } from '../pipes/remove-tags';
import { ReversePipe } from "../pipes/reverse";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Eventos } from "../pages/eventos/eventos";
import { Usuario } from "../pages/usuario/usuario";
import { Calendario } from "../pages/calendario/calendario";
import { DetalleEvento } from "../pages/detalle-evento/detalle-evento";

import { NgCalendarModule } from 'ionic2-calendar';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EventProvider } from "../providers/event-provider";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Eventos,
    Usuario,
    Calendario,
    DetalleEvento,
    SafePipe,
    RemoveTags,
    ReversePipe
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{ 
          tabsPlacement: 'bottom',
          monthNames: ['enero', 'febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre' ],
          monthShortNames: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
          dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
          dayShortNames: ['D', 'L', 'M', 'X', 'J', 'V', 'S']
    }),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Eventos,
    Usuario,
    Calendario,
    DetalleEvento
  ],
  providers: [
    StatusBar,
    { provide: LOCALE_ID, useValue: 'es-ES' },
    SplashScreen,
    EventProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SafePipe,
    RemoveTags,
    ReversePipe,
    NativeGeocoder,
    GoogleMaps,
    Device,
    InAppBrowser,
    AppAvailability
  ]
})
export class AppModule { }
