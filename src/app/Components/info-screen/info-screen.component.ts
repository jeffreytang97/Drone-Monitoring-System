import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from 'angularfire2/database';
import {DroneService} from "../../Services/drone/drone.service";
import {Drone} from "../../models/drone";

@Component({
  selector: 'app-info-screen',
  templateUrl: './info-screen.component.html',
  styleUrls: ['./info-screen.component.css']
})
export class InfoScreenComponent implements OnInit {

  //droneData: Observable<any[]>;

  drones: Drone[];
  currentlySelectedDroneID : string;

  constructor(private droneService: DroneService) {
    //this.droneData = db.list('/Drone_data').valueChanges();
  }

  ngOnInit() {

    this.subscribeToDrones();

    this.subscribeToCurrentlySelectedDrone();

  }

  subscribeToCurrentlySelectedDrone(){
    this.droneService.getCurrentlySelectedDrone().subscribe(drone => {
      if(drone != null){
        //If the sub object is not null, grab and update
        this.currentlySelectedDroneID = Object.values(drone)[0];
      }
    })
  }

  private subscribeToDrones() {

    //Subscription to the droneService's list of drones
    this.droneService.getDrones().subscribe(drones => {

      this.drones = []; //When the drone list in the service changes, it will be reset here

      Object.values(drones).forEach(value => { //Objects from the service need to be transformed to be used
        this.drones.push(value);
      });

    });

  }
}
