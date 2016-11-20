import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import {TabsComponent} from "./pages/tabs/tabs.component";
import {Workoutservice} from "./providers/workoutservice/workoutservice";


declare var cordova;

@Component({
  providers: [Workoutservice],
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = TabsComponent;


  constructor(public platform: Platform, public workoutService: Workoutservice) {
    platform.ready().then(() => {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
