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

  // Variable initialization
  drones: Drone[];
  currentlySelectedDroneID : string;
  latitude: number;
  longitude: number;
  drone_id: string;
  heading: number;
  drone_coordinate = new google.maps.LatLng(this.latitude, this.longitude);

  constructor(private droneService: DroneService) {
  }

  ngOnInit() {
    this.subscribeToDrones();
    this.subscribeToCurrentlySelectedDrone();
  }

  subscribeToCurrentlySelectedDrone(){
    this.droneService.getCurrentlySelectedDrone().subscribe(drone => {

      // drone here is the ID of the selected drone
      if(drone != null){
        //If the sub object is not null, grab and update

        this.currentlySelectedDroneID = Object.values(drone).join("");
        console.log(this.currentlySelectedDroneID);
        this.drone_id = this.currentlySelectedDroneID;

        // Grab the necessary data to be outputted on the info display screen
        for (var i = 0; i < this.drones.length; i++) {
          if(this.drones[i].id === this.drone_id){
            this.latitude = this.drones[i].latitude;
            this.longitude = this.drones[i].longitude;
            this.heading = this.drones[i].heading;
            break;
          }
        }
      }
      this.isDroneSelected();
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

  private isDroneSelected() {
    if(this.currentlySelectedDroneID) {
      return true;
    }else{
      return false;
    }
  }
}
