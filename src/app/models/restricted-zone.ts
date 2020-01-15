import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';

export class RestrictedZone {

  public id : number;
  public zoneEdges : GeoPoint[] = [];

}
