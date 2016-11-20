import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, ModalController, Modal, MenuController} from 'ionic-angular';
import {Workoutservice} from "../../providers/workoutservice/workoutservice";
import {GuidePage} from "../guide/guide";

declare var $:any;

@Component({
  templateUrl: 'build/pages/individual/individual.html'
})
export class IndividualPage implements OnInit{

  partChosen:string;
  showButton:boolean = false;
  wholeData;
  singleData = {
    equipment: "",
    level: "",
    muscle: "",
    pic1: "",
    pic2: "",
    type: ""
  };

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              public workoutService: Workoutservice,
              private myalert: AlertController,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController) {}

  ngOnInit(){



    this.partChosen = this.navParams.data.bodypart;

    let testData = this.workoutService.getWorkouts(this.partChosen)
      .subscribe(
        data => {
          // console.log(data);
          this.wholeData = data;
        }, err => {
          console.log(err);
        }
      );

    let vm = this;

    $("#mycard").hide();







    // $("#shaker").click(function(){
    //
    //   let randomNum = Math.floor((Math.random() * vm.wholeData.length) + 1);
    //   vm.singleData = vm.wholeData[randomNum];
    //   console.log(vm.singleData);
    //
    //   $("#shaker").effect("shake",{direction:"up", distance: 60, times: 8}, function(){
    //       $("#shaker").hide("fade",300 , function(){
    //         vm.showButton = true;
    //         $("#mycard").show("scale", {percent: 100});
    //         $(".swiper-pagination")[0].className = "swiper-pagination";
    //         // $(".swiper-pagination").append(`<span class='swiper-pagination-bullet'></span>`);
    //
    //       })
    //   });
    // })
  }




  shakeAgain(){
    let vm = this;
    $("#mycard").hide("scale", {percent: 0}, function(){
      vm.showButton = false;
      $("#shaker").show("fade", 300);
      $("#shakerText").show("fade", 300);
    });
  }

  onTouch(){
    let vm = this;
    let randomNum = Math.floor((Math.random() * vm.wholeData.length) + 1);
    vm.singleData = vm.wholeData[randomNum];
    console.log(vm.singleData);
    $("#shakerText").hide();

    $("#shaker").effect("shake",{direction:"up", distance: 60, times: 8}, function(){
      $("#shaker").hide("fade",300 , function(){
        vm.showButton = true;
        $("#mycard").show("scale", {percent: 100});
        $(".swiper-pagination")[0].className = "swiper-pagination";
        // $(".swiper-pagination").append(`<span class='swiper-pagination-bullet'></span>`);

      })
    });
  }


  addWorkout(data){

    let prompt = this.myalert.create({
      // title: 'Login',
      message: "How many sets?",
      inputs: [
        {
          name: 'set',
          type: 'number',
          placeholder: '0'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: result => {
            console.log(result);
            let addMainMuscle = {
              main_muscle : this.partChosen,
              sets        : result.set,
              equipment   : data.equipment,
              guide       : data.guide,
              level       : data.level,
              muscle      : data.muscle,
              pic1        : data.pic1,
              pic2        : data.pic2,
              type        : data.pull
            };
            this.workoutService.addMyWorkout(addMainMuscle).then(
              result => {
                console.log("Added the workout into your workout tabs");
              }, err =>{
                console.log("failed to add");
                console.log(err);
              }
            )
          }
        }
      ]
    });
    prompt.present();


  }

  goToGuide(){
    let modal = this.modalCtrl.create(GuidePage, {workout: this.singleData});
    modal.present(modal);

  }

  bringOutMenu(){
    console.log("works");
    // this.menuCtrl.open();
  }




}
