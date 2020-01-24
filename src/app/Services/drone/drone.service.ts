import {Injectable} from '@angular/core';
import {Drone} from "../../models/drone";
import {BehaviorSubject, Observable, of} from "rxjs";
import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {RestrictedZone} from "../../models/restricted-zone";

@Injectable({
  providedIn: 'root'
})
export class DroneService {

  private drones: Drone[];
  observableDrones: BehaviorSubject<Drone[]>;

  private currentlySelectedDroneId: string;
  observableCurrentlySelectedDroneId: BehaviorSubject<string>;

  constructor(db: AngularFireDatabase) {

    this.drones = [];
    this.observableDrones = <BehaviorSubject<Drone[]>>new BehaviorSubject([]);

    this.currentlySelectedDroneId = null;
    this.observableCurrentlySelectedDroneId = <BehaviorSubject<string>>new BehaviorSubject(null);

    this.subscribeToDBDrones(db);

  }

  subscribeToDBDrones(db: AngularFireDatabase) {
    //Subscribe to the drone data from the DB
    db.list('/Drone_data').valueChanges().subscribe(DBData => {

      this.drones = [];

      DBData.forEach(data => {

        // @ts-ignore
        let newDrone: Drone = new Drone(data.id as string, data.latitude as number, data.longitude as number, data.heading_angle as number);
        this.add(newDrone);

      });

    });
  }

  add(drone: Drone) {
    this.drones.push(drone);
    this.observableDrones.next(Object.assign({}, this.drones));
  }

  remove(drone: Drone) {
    this.drones.splice(this.drones.indexOf(drone), 1);
    this.observableDrones.next(Object.assign({}, this.drones));
  }

  getDrones(): Observable<Drone[]> {
    return this.observableDrones.asObservable();
  }

  public setCurrentlySelectedDrone(drone: string) {
    this.currentlySelectedDroneId = drone;
    this.observableCurrentlySelectedDroneId.next(Object.assign({}, this.currentlySelectedDroneId));
  }

  getCurrentlySelectedDrone(): Observable<string> {
    return this.observableCurrentlySelectedDroneId.asObservable();
  }

}
