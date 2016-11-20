import {Component, OnInit} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';

/*
  Generated class for the GuidePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/guide/guide.html',
})
export class GuidePage implements OnInit{

  singleData:any;

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private params: NavParams) {

  }

  ngOnInit(){
    this.singleData = this.params.get('workout');
  }

    dismiss() {
      this.viewCtrl.dismiss();
    }
}
