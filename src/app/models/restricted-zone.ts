import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';

export class RestrictedZone {

  private _id : number;
  private _zoneLatitudes : number[];
  private _zoneLongitudes : number[];

 constructor(id: number, zoneLatitudes: number[], zoneLongitudes: number[]){
    this._id = id;
    this._zoneLatitudes = zoneLatitudes;
    this._zoneLongitudes = zoneLongitudes;
  }

  get id(): number {
    return this._id;
  }

  get zoneLatitudes(): number[] {
    return this._zoneLatitudes;
  }

  get zoneLongitudes(): number[] {
    return this._zoneLongitudes;
  }

  clearZone(){
   this._id = -1;
   this._zoneLatitudes = [];
   this._zoneLongitudes = [];
  }

}
