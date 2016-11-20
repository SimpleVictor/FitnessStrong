import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Workoutservice} from "../../providers/workoutservice/workoutservice";
import {SqlStorage, Storage} from 'ionic-angular';


/*
  Generated class for the SettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {

  storage;

  constructor(private navCtrl: NavController, private workoutService: Workoutservice) {

  }

  clearEverything(){
    this.workoutService.clearWorkout()
      .then(
        (data) => {
          console.log(data)
          this.storage = new Storage(SqlStorage);
          this.storage.query('CREATE TABLE IF NOT EXISTS currentworkout (id INTEGER PRIMARY KEY AUTOINCREMENT, main_muscle TEXT , muscle TEXT, sets INT ,equipment TEXT, level TEXT, pic1 TEXT, pic2 TEXT, type TEXT)')
            .then(
              result => {
                console.log(result);
                console.log("success making table");
              }, err => {
                console.log("failed making table");
                console.log(err);
              }
            );
        }, (err) => {
          console.log(err)
        });
  }

}
