import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {SqlStorage, Storage} from 'ionic-angular';

/*
  Generated class for the Workoutservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Workoutservice {

  storage: Storage = null;

  constructor(private http: Http) {
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
  }

  getWorkouts(body){
    // return this.http.request(`../../workoutjson/${body}.json`).map((res:Response) => res.json());
    let url = `workoutjson/${body}.json`;
    console.log(url);
    return this.http.get(url).map((res:Response) => res.json());
  }

  getMyWorkout(){
    return this.storage.query('SELECT * FROM currentworkout');
  }

  addMyWorkout(data){
    console.log(data);
    let sql = 'INSERT INTO currentworkout (main_muscle , muscle, sets , equipment, level, pic1, pic2, type) VALUES (?,?,?,?,?,?,?,?)';
    return this.storage.query(sql, [data.main_muscle ,data.muscle, data.sets ,data.equipment , data.level, data.pic1, data.pic2, data.type]);
  }

  removeMyWorkout(id){
    let sql = `DELETE FROM currentworkout WHERE id=${id}`;
    return this.storage.query(sql);
  }

  decreaseSets(id){

  }

  clearWorkout(){
    return this.storage.query("DROP TABLE IF EXISTS currentworkout");
  }



}

