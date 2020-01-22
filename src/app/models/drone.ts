import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;

export class Drone {
  constructor(id: string, geoPoint: firebase.firestore.GeoPoint, heading_angle: number) {
  this.id = id;
  this.geoPoint = geoPoint;
  this.heading = heading_angle;
  }

  public id: string;
  public geoPoint: GeoPoint;
  public heading : number;
}
