import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from "../usuario/usuario";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Userwp } from "../../providers/userwp";
import { emailValidator, matchingPasswords } from '../../validators/customValidators';
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


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private userWp: Userwp) {
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

      this.userWp.lostpass().subscribe(
        html => this.lostPassword =html
      )
  }

  ionViewDidLoad() {
  }

  logForm() {
    this.userWp.userLogin(this.Login.value).subscribe(
      result => {
        console.log(result);
        if (result.code == 200) {
          this.navCtrl.setRoot(Usuario, {
            info: result.data
          });
        }
      }
    )
  }

  registerForm() {
    this.userWp.register(this.Register.value).subscribe(
      result => {
        console.log(result);
      }
    )
  }

}
