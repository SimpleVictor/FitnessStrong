import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BodyPage} from "../body/body";

/*
  Generated class for the RandomizerPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/randomizer/randomizer.html',
})
export class RandomizerPage {

  constructor(private navCtrl: NavController) {

  }

  onClick(){
    this.navCtrl.push(BodyPage);
  }

}
