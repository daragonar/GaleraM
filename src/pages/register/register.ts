import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';
import { Userwp } from "../../providers/userwp";
import { emailValidator, matchingPasswords } from '../../validators/customValidators';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
Register: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder:FormBuilder, private userWp:Userwp) {
this.Register=this.formBuilder.group({
      user: ['', // default value
                Validators.compose([Validators.required])],
      pass: ['',Validators.compose([Validators.required])],
      matchPassword: ['',Validators.compose([Validators.required])],
      mail: ['',Validators.compose([Validators.required,emailValidator])]}
      , {validator: matchingPasswords('pass', 'matchPassword')})

  }

  ionViewDidLoad() {
  }

  registerForm()
{
  this.userWp.register(this.Register.value).subscribe(
                result => 
                { 
                  console.log(result);
                }
            )
}

}
