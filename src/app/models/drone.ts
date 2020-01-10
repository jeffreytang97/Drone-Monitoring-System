import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;

export class Drone {
  private id: number;
  private geoPoint: GeoPoint;
}
