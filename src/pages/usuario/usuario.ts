import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
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
    base64Image;
    image;

    constructor(
        private userWp: Userwp,
        public navCtrl: NavController,
        public navParams: NavParams,
        private eventosService: EventProvider,
        public userD: UserDataProvider,
        public ActShCtrl: ActionSheetController,
        public AlertMsg: AlertController,
        private camera: Camera) {
        /*this.user = navParams.get('info');
        this.base64Image = this.userD.getUserImage()
        this.listCategory = this.userD.getUserCatData();
        this.listEvent = this.userD.getUserEvData();*/
    }

    ionViewWillEnter() {
        let imageTest=this.userD.getUserImage();
        this.user = this.navParams.get('info');
        if (imageTest!=undefined) {
            this.base64Image = "data:image/jpeg;base64," + this.userD.getUserImage();
        }
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
        this.base64Image = null;
        this.navCtrl.setRoot(Login);
        this.navCtrl.parent.select(1);
    }

    editImagen() {

        let alert = this.ActShCtrl.create({
            title: 'Modifica tu foto',
            buttons: [
                {
                    text: 'Cancelar', role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }, {
                    text: 'Camara',
                    handler: () => {
                        this.getPicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Galeria',
                    handler: () => {
                        this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                }
            ]
        });
        alert.present();
    }

    getPicture(sourceType) {
        let options: CameraOptions = {
            quality: 30,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.DATA_URL
        }
        this.camera.getPicture(options)
            .then(imageData => {
                this.image = `data:image/jpeg;base64,${imageData}`;
                this.userWp.setUserImage(imageData);
                this.base64Image = "data:image/jpeg;base64," + imageData;
            })
            .catch(error => {
                console.error(error);
            });
    }

    openNoti() {
        this.flechaNot = this.flechaNot === 'ios-arrow-down' ? 'ios-arrow-up' : 'ios-arrow-down';
        this.openNot = this.openNot === false ? true : false;
    }

    openCat(category) {
        this.EventosLista = [];
        this.categoria = this.categoria === undefined ? category : undefined;
        if (this.categoria != undefined) {
            this.eventosService.getEventsByCategory(this.categoria).subscribe(
                result => {
                    this.EventosLista = result.events;
                }
            )
        }
    }

    eventTapped(event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(DetalleEvento, {
            item: item
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
