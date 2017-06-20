import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Login } from "../login/login";
import { Userwp } from "../../providers/userwp";
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
    user: object;
    flechaNot: string = "ios-arrow-down";
    openNot: boolean = false;
    eventNot: number = 0;
    categoria;
    listCategory;
    listEvent;
    base64Image;

    constructor(
        private userWp: Userwp,
        public navCtrl: NavController,
        public navParams: NavParams,
        public userD: UserDataProvider,
        public AlertMsg: AlertController) {
        this.user = navParams.get('info');
        this.base64Image = this.userD.getUserImage()
        this.listCategory = this.userD.getUserCatData();
        this.listEvent = this.userD.getUserEvData();
    }

    ionViewWillEnter() {

    }

    cerrarSesion() {
        this.userD.setUserData(undefined);
        this.userD.setUserEvData(undefined);
        this.userD.setUserCatData(undefined);
        this.userD.setUserImage(undefined);
        this.navCtrl.setRoot(Login);
        this.navCtrl.parent.select(1);
    }

    editImagen() {
        let alert = this.AlertMsg.create({
            title: 'La Galera Magazine',
            message: 'Cambia la foto de tu cuenta',
            buttons: [
                {
                    text: 'Cancelar', role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }, {
                    text: 'Camara',
                    handler: () => {
                        console.log('Camara');
                    }
                },
                {
                    text: 'Galeria',
                    handler: () => {
                        console.log('Galeria');
                    }
                }
            ]
        });
        alert.present();
    }

    openNoti() {
        this.flechaNot = this.flechaNot === 'ios-arrow-down' ? 'ios-arrow-up' : 'ios-arrow-down';
        this.openNot = this.openNot === false ? true : false;
    }

    openCat(cat) {
        console.log(this.categoria)
        this.categoria = this.categoria === undefined ? cat : undefined;;
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
