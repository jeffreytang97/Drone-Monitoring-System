import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;

export class Drone {
  constructor(id: string, latitude: number, longitude: number, heading_angle: number) {
  this.id = id;
  //this.geoPoint = geoPoint;
  this.latitude = latitude;
  this.longitude = longitude;
  this.heading = heading_angle;
  }

  public id: string;
  //public geoPoint: GeoPoint;
  public latitude: number;
  public longitude: number;
  public heading : number;
}
