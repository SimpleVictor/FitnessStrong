import {Component, OnInit, ElementRef} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Workoutservice} from "../../providers/workoutservice/workoutservice";

declare var $:any;

@Component({
  templateUrl: 'build/pages/workouts/workouts.html'
})
export class WorkoutsPage implements OnInit{

  storage:any = null;
  myData:any = null;
  currentLength;

  abs:any[] = [];
  back:any[] = [];
  bicep:any[] = [];
  chest:any[] = [];
  forearm:any[] = [];
  legs:any[] = [];
  shoulder:any[] = [];
  traps:any[] = [];
  tricep:any[] = [];


  workout: string = "today";
  isAndroid: boolean = false;



  constructor(private navCtrl: NavController,
              public workoutService: Workoutservice,
              private el: ElementRef,
              private platform: Platform) {}

  ngOnInit(){
    this.isAndroid = this.platform.is('android');
  }

  ionViewWillEnter(){

    if(this.currentLength){
      this.workoutService.getMyWorkout().then(
        data => {
            // this.currentLength = data.res.rows.length;
            // this.splitUpData(data.res.rows);

          this.splitUpData(data);

        }, err => {
          console.log("ERROR HERE " + err);
        }
      );

    }else{
      this.workoutService.getMyWorkout().then(
        data => {
          // console.log(data);
          // this.currentLength = data.res.rows.length;
          // this.splitUpData(data.res.rows);
          this.splitUpData(data);


        }, err => {
          console.log("ERROR HERE " + err);
        }
      );
    }
  }

  splitUpData(data){
    this.clearBodyArray();
    console.log("hereeeeeeee");
    console.log(data);
    if(data.res.rows.length > 0) {
      for (let i = 0; i < data.res.rows.length; i++) {
        let item = data.res.rows.item(i);
        switch (item.main_muscle) {
          case "bicep":
            this.bicep.push(item);
            break;
          case "legs":
            this.legs.push(item);
            break;
          case "back":
            this.back.push(item);
            break;
          case "chest":
            this.chest.push(item);
            break;
          case "traps":
            this.traps.push(item);
            break;
          case "shoulder":
            this.shoulder.push(item);
            break;
          case "abs":
            this.abs.push(item);
            break;
          case "forearms":
            this.forearm.push(item);
            break;
          case "tricep":
            this.tricep.push(item);
        }
      }
    }


  }

  clearBodyArray(){
    this.abs= [];
    this.back= [];
    this.bicep= [];
    this.chest= [];
    this.forearm= [];
    this.legs= [];
    this.shoulder= [];
    this.traps= [];
    this.tricep= [];
  }

  deleteWorkout(index, id, body){
    this.workoutService.removeMyWorkout(id)
      .then(
        data => {
          this[body].splice(index, 1);
        }, err => {
          console.log(err);
        }
      );
  }


  decreaseSet(i, body, badge){
    // console.log(this[body][i].sets)
    if(this[body][i].sets >= 1){
      this[body][i].sets = this[body][i].sets - 1;
      if(this[body][i].sets == 0){
        console.log($(badge));
        $(badge)[0].className = "badge-secondary";
        $(badge)[0].innerHTML = "";
        $(badge)[0].innerHTML = "All Done!";
      }
    }else{
      console.log("can't go anymore down");
    }
  }



}
