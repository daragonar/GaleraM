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


  constructor(public navCtrl: NavController, public navParams: NavParams, public userD: UserDataProvider, private formBuilder: FormBuilder, private userWp: Userwp) {
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

check(variable){
  console.log(variable);
  console.log(this.Register.controls.mail.errors)
  if (variable===true){
    this.Register.controls.matchPassword.setValue("");
  }
}

showPassword(input: any): any {
   input.type = input.type === 'password' ?  'text' : 'password';
   this.ojo = this.ojo === 'eye-off' ? 'eye': 'eye-off';
  }



  logForm() {
    this.userWp.userLogin(this.Login.value).subscribe(
      result => {
        this.userWp.getUserEvents(result.data.ID).then(data => {this.userD.setUserEvData(data[0].a);});
        this.userWp.getUserCategories(result.data.ID).then(data => {this.userD.setUserCatData(data[0].a);});
        this.userD.setUserData(result.data);
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
