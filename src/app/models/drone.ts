import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;

export class Drone {
  public id: number;
  public geoPoint: GeoPoint;
}
