import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController,  LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Login } from "../login/login";
import { DetalleEvento } from "../detalle-evento/detalle-evento";
import { Userwp } from "../../providers/userwp";
import { EventProvider } from "../../providers/event-provider";
import { UserDataProvider } from "../../providers/user-data";
/**
 * Generated class for the Usuario page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-usuario',
    templateUrl: 'usuario.html'
})
export class Usuario {
    public EventosLista: Array<string>;
    user: object = [];
    flechaNot: string = "ios-arrow-down";
    openNot: boolean = false;
    eventNot: number = 0;
    categoria: any = null;
    listCategory: any = [];
    listEvent: any = [];
    image;

    constructor(
        private userWp: Userwp,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        private eventosService: EventProvider,
        public userD: UserDataProvider,
        public ActShCtrl: ActionSheetController,
        public AlertMsg: AlertController,
        private camera: Camera) {
        /*this.user = navParams.get('info');
        this.listCategory = this.userD.getUserCatData();
        this.listEvent = this.userD.getUserEvData();*/
    }

    ionViewWillEnter() {
        this.user = this.navParams.get('info');
        this.listCategory = this.userD.getUserCatData();
        this.listEvent = this.userD.getUserEvData();
    }

    cerrarSesion() {
        this.userD.setUserData(undefined);
        this.userD.setUserEvData(undefined);
        this.userD.setUserCatData(undefined);
        this.userD.setUserImage(undefined);
        this.user = [];
        this.listEvent = [];
        this.listCategory = [];
        this.navCtrl.setRoot(Login);
        this.navCtrl.parent.select(1);
    }

    editImagen() {

        let alert = this.ActShCtrl.create({
            title: 'Modifica tu foto',
            buttons: [
                {
                    text: 'Cancelar', role: 'cancel',
                    icon: 'close',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }, {
                    text: 'Desde la cámara',
                    icon: 'camera',
                    handler: () => {
                        return this.setAvatar(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Desde la galería',
                    icon: 'image',
                    handler: () => {
                        return this.setAvatar(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                }
            ]
        });
        alert.present();
    }

    setAvatar(sourceType) {
        let options: CameraOptions = {
            sourceType: sourceType,
            correctOrientation: true,
            cameraDirection: 0,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            destinationType: this.camera.DestinationType.DATA_URL
        }
        this.camera.getPicture(options).then(imageData => {
            imageData = "data:image/jpeg;base64," + imageData;
            this.image=this.userWp.setUserImage(imageData);
        }, (error) => {
            console.error(error);
        });
    }

    getAvatar(){
        return this.userWp.getUserImage().subscribe(
            result => {
                this.image=result;
                console.log(this.image);
            }
        );
    }

    openNoti() {
        this.flechaNot = this.flechaNot === 'ios-arrow-down' ? 'ios-arrow-up' : 'ios-arrow-down';
        this.openNot = this.openNot === false ? true : false;
    }

    openCat(category) {
        this.EventosLista = [];
        this.categoria = this.categoria === undefined ? category : undefined;

        if (this.categoria != undefined) {
            let loader = this.loadingCtrl.create({
                content: "Obteniendo Eventos...",
            });
            loader.present().then(() => {
                this.eventosService.getEventsByCategory(this.categoria).subscribe(
                    result => {
                        this.EventosLista = result.events;
                        loader.dismiss();
                    }
                )
            });
        }
    }

    eventTapped(event, item) {
        // That's right, we're pushing to ourselves!
        let loader = this.loadingCtrl.create({
            content: "Cargando evento...",
        });
        loader.present().then(() => {
            this.eventosService.getEvent(item.id).subscribe(
                result => {
                    this.navCtrl.push(DetalleEvento, {
                        item: result
                    });
                    loader.dismiss();
                }
            );
        });
    }

    followCategory(id_categoria) {
        //Si no está logueado añadir esto
        if (this.userD.getUserData() != undefined) {
            this.userWp.setUserCategory(id_categoria);
        } else {
            // Import the AlertController from ionic package 
            // Consume it in the constructor as 'alertCtrl' 
            let alert = this.AlertMsg.create({
                title: 'La Galera Magazine',
                message: 'Si quieres guardar tus favoritos no dudes en registrarte o loguearte si ya tienes una cuenta',
                buttons: [
                    {
                        text: 'Cancelar', role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }, {
                        text: 'Login',
                        handler: () => {
                            this.navCtrl.push(Login);
                        }
                    }
                ]
            });
            alert.present();
        }
    }

    isFollowedCategory(id_categoria) {
        if (this.userD.getUserData() != undefined) {
            if (this.userD.getUserCatData().indexOf(id_categoria) != -1) {
                return true;
            } else {
                return false;
            }
        }
    }
}
