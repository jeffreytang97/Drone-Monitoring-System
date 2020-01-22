import {Injectable} from '@angular/core';
import {Drone} from "../../models/drone";
import {BehaviorSubject, Observable, of} from "rxjs";
import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DroneService {

  private droneData: any[];
  private drones: Drone[];
  observableDrones: BehaviorSubject<Drone[]>;

  constructor(db: AngularFireDatabase) {

    this.drones = [];
    this.observableDrones = <BehaviorSubject<Drone[]>>new BehaviorSubject([]);

    //TODO : Subscribe to DB to update drone info everywhere in website

    db.list('/Drone_data').valueChanges().subscribe(DBData => {
      this.droneData = DBData;

      this.drones = [];

      DBData.forEach(data => {

        // @ts-ignore
        let newDrone: Drone = new Drone(data.id as string, new GeoPoint(data.latitude as number, data.longitude as number), data.heading_angle as number);
        this.add(newDrone);

      });

      console.log(this.drones);

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

}
