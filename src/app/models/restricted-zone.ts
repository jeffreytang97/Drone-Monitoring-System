import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';

export class RestrictedZone {

  public id : number;
  public zoneLatitudes : number[];
  public zoneLongitudes : number[];

 constructor(id: number, zoneLatitudes: number[], zoneLongitudes: number[]){
    this.id = id;
    this.zoneLatitudes = zoneLatitudes;
    this.zoneLongitudes = zoneLongitudes;
  }

}
