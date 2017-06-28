import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Usuario } from "../usuario/usuario";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Userwp } from "../../providers/userwp";
import { emailValidator, matchingPasswords } from '../../validators/customValidators';
import { UserDataProvider } from "../../providers/user-data";
import { NativeStorage } from '@ionic-native/native-storage';


/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  Login: FormGroup;
  Register: FormGroup;
  logReg: string;
  lostPassword: any;
  showPass: boolean;
  ojo: string = "eye-off";
  public evFav: any;
  error: string;
  storeData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userD: UserDataProvider,
    private formBuilder: FormBuilder,
    private userWp: Userwp,
    public storage: NativeStorage,
    public loadingCtrl:LoadingController,
  ) {
    this.storeData = null;
    if (this.userD.getUserData() != undefined) {
      this.navCtrl.setRoot(Usuario, {
        info: this.userD.getUserData()
      });
    }
    this.logReg = "login";
    this.Login = this.formBuilder.group({
      user: ['', // default value
        Validators.compose([Validators.required])],
      pass: ['', Validators.compose([Validators.required])],
      remember: [false]
    })
    this.Register = this.formBuilder.group({
      user: ['', // default value
        Validators.compose([Validators.required])],
      pass: ['', Validators.compose([Validators.required])],
      matchPassword: ['', Validators.compose([Validators.required])],
      mail: ['', Validators.compose([Validators.required, emailValidator])]
    }
      , { validator: matchingPasswords('pass', 'matchPassword') })

    this.storage.getItem('myForm')
      .then(
      data => {
        console.log(data);
        if (data != null) {
          this.storeData = data;
          this.Login.controls['user'].setValue(this.storeData.user);
          this.Login.controls['pass'].setValue(this.storeData.pass);
          this.Login.controls['remember'].setValue(this.storeData.remember);
        }
      },
      error => console.error(error)
      );

    /* this.userWp.lostpass().subscribe(
       html => this.lostPassword = html
     )*/
  }

  ionViewWillEnter() {
    console.log("muesta datos del logout");
    console.log(this.userD.getUserData());
    console.log(this.userD.getUserImage());
    if (this.storeData != null) {
      this.Login.controls['user'].setValue(this.storeData.user);
      this.Login.controls['pass'].setValue(this.storeData.pass);
      this.Login.controls['remember'].setValue(this.storeData.remember);
    }

  }

  check(variable) {
    if (variable === true) {
      this.Register.controls.matchPassword.setValue("");
    }
  }
  store(val) {
    this.storage.setItem('myForm', val)
      .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
      );
  };


  deleteStore() {
    this.storage.remove('myForm')
  };
  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.ojo = this.ojo === 'eye-off' ? 'eye' : 'eye-off';
  }

  logForm() {
    
    let loading = this.loadingCtrl.create({
    content: 'Iniciando sesión...'
    });

  loading.present();
    this.userWp.userLogin(this.Login.value).subscribe(
      result => {
        this.userD.setUserData(result.data);
        if (result.code == 200) {
          if (this.Login.value.remember == true) {
            this.store(this.Login.value)
          } else {
            this.deleteStore()
          }
          this.userWp.getUserEvents(result.data.ID).then(data => {
            console.log("entra en getUserEvents");
            if (data) {
              this.userD.setUserEvData(data);
            }
            else {
              let userEvFav = [];
              this.userD.setUserEvData(userEvFav);
              console.log("No hay eventos!");
            }
          });

          this.userWp.getUserCategories(result.data.ID).then(data => {
            console.log("entra en getUserCategories");
            if (data) {
              this.userD.setUserCatData(data);
              console.log(data);
            }
            else {
              let userCatFav = [];
              this.userD.setUserCatData(userCatFav);
              console.log("No hay categorías!");
            }
          });

          setTimeout(() => {
            this.navCtrl.setRoot(Usuario, {
              info: result.data
            });
            loading.dismiss();
          }, 1000);


        } else {
          this.error = result.data;

          setTimeout(() => {
            loading.dismiss();
          }, 500);
        }
      }
    )
  }

  registerForm() {
    this.userWp.register(this.Register.value).subscribe(
      result => {
        if (result.code == 200) {
          this.Login = this.Register;
          this.logForm();
        } else {
          this.error = result.data;
        }
      }
    )
  }
}
