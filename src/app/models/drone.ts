import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;

export class Drone {
  id: number;
  geoPoint : GeoPoint;
}
