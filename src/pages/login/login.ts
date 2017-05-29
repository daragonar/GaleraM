import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from "../usuario/usuario";
import { Register } from "../register/register";
import { Validators, FormBuilder,FormGroup } from '@angular/forms';
import { Userwp } from "../../providers/userwp";
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder, private userWp: Userwp) {
this.Login=this.formBuilder.group({
      user: ['', // default value
                Validators.compose([Validators.required])],
      pass: ['',Validators.compose([Validators.required])],
      remember: ['false']})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

logForm()
{
  this.userWp.userLogin(this.Login.value).subscribe(
                result => 
                { 
                  console.log(result);
                  if(result.code==200)
                  {
                  this.navCtrl.setRoot(Usuario, {
                    info : result.data
                  });
                  }
                }
            )
}

Register()
{
  this.navCtrl.push(Register)
}

}
