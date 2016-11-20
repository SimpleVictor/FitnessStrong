import { Component, OnInit } from '@angular/core';
import {RandomizerPage} from "../randomizer/randomizer";
import {WorkoutsPage} from "../workouts/workouts";
import {SettingsPage} from "../settings/settings";
import {BodyPage} from "../body/body";

@Component({
    template: `

    <ion-tabs>
      <ion-tab tabTitle="Randomizer" tabIcon="sync" [root]="tab1"></ion-tab>
      <ion-tab tabTitle="Workouts" tabIcon="ios-add-circle" [root]="tab2" tabBadge="3" danger></ion-tab>
      <!--<ion-tab tabTitle="Settings" tabIcon="settings" [root]="tab3"></ion-tab>-->
    </ion-tabs>


`,
})
export class TabsComponent implements OnInit {
  private tab1: any;
  private tab2: any;
  // private tab3: any;

  constructor() {

    this.tab1 = BodyPage;
    this.tab2 = WorkoutsPage;
    // this.tab3 = SettingsPage;


  }

    ngOnInit() { }

}
