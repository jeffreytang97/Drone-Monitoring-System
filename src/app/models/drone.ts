import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;

export class Drone {
  constructor(id: string, geoPoint: firebase.firestore.GeoPoint, heading_angle: number) {

  }

  public id: number;
  public geoPoint: GeoPoint;
  public heading : number;
}
