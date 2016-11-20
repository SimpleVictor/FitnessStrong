import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {IndividualPage} from "../individual/individual";

/*
  Generated class for the BodyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/body/body.html',
})
export class BodyPage {

  constructor(private navCtrl: NavController) {

  }


  pickBody(val){
    console.log(val);
    this.navCtrl.push(IndividualPage, {
      bodypart: val
    });
  }


}
