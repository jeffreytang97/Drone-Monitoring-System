import {Injectable} from '@angular/core';
import {Drone} from "../../models/drone";
import {Observable, of} from "rxjs";
import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DroneService {

  private drones: Drone[] = [];

  constructor() {
    //TODO : Subscribe to DB to update drone info everywhere in website

    //THIS IS TEST DATA - REMOVE LATER
    this.drones = [
      {id: 0, geoPoint: new GeoPoint(0, 0)},
      {id: 1, geoPoint: new GeoPoint(0, 0)},
      {id: 2, geoPoint: new GeoPoint(0, 0)},
      {id: 3, geoPoint: new GeoPoint(0, 0)},
      {id: 23, geoPoint: new GeoPoint(0, 0)},
      {id: 33, geoPoint: new GeoPoint(0, 0)},
      {id: 34, geoPoint: new GeoPoint(0, 0)}

    ];

  }

  getDrones(): Observable<Drone[]>{
    return of(this.drones);
  }

}
