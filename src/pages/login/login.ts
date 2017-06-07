import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from "../usuario/usuario";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Userwp } from "../../providers/userwp";
import { emailValidator, matchingPasswords } from '../../validators/customValidators';
import { UserDataProvider } from "../../providers/user-data";
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userD: UserDataProvider,
    private formBuilder: FormBuilder,
    private userWp: Userwp
  ) {
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
      remember: ['false']
    })
    this.Register = this.formBuilder.group({
      user: ['', // default value
        Validators.compose([Validators.required])],
      pass: ['', Validators.compose([Validators.required])],
      matchPassword: ['', Validators.compose([Validators.required])],
      mail: ['', Validators.compose([Validators.required, emailValidator])]
    }
      , { validator: matchingPasswords('pass', 'matchPassword') })


   /* this.userWp.lostpass().subscribe(
      html => this.lostPassword = html
    )*/
  }

  ionViewDidLoad() {
  }

  check(variable) {
    console.log(variable);
    console.log(this.Register.controls.mail.errors)
    if (variable === true) {
      this.Register.controls.matchPassword.setValue("");
    }
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.ojo = this.ojo === 'eye-off' ? 'eye' : 'eye-off';
  }

  logForm() {
    this.userWp.userLogin(this.Login.value).subscribe(
      result => {
        this.userD.setUserData(result.data);
        if (result.code == 200) {
          this.userWp.getUserEvents(result.data.ID).then(data => {
            if (data[0]) {
              this.userD.setUserEvData(data[0]);
            }
            else {
              let userEvFav = [];
              this.userD.setUserEvData(userEvFav);
            }
          });

          this.userWp.getUserCategories(result.data.ID).then(data => {
            if (data[0]) {
              this.userD.setUserCatData(data[0]);
            }
            else {
              let userCatFav = [];
              this.userD.setUserCatData(userCatFav);
            }
          });

          this.navCtrl.setRoot(Usuario, {
            info: result.data
          });

        } else { 
          this.error = result.data;
        }
      }
    )
  }

  registerForm() {
    this.userWp.register(this.Register.value).subscribe(
      result => {
        if (result.code == 200) {
          this.Login=this.Register;
          this.logForm();
        } else {
          console.log(result);
          this.error = result.data;
        }
      }
    )
  }
}
