import {Injectable} from '@angular/core';
import {RestrictedZone} from "../../models/restricted-zone";
import {Observable, of} from "rxjs";
import {Drone} from "../../models/drone";
import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RestrictedZoneService {

  private restrictedZones: RestrictedZone[] = [];

  constructor() {

    this.restrictedZones = [
      {id: 0, zoneEdges: [new GeoPoint(0,0)]},
      {id: 1, zoneEdges: [new GeoPoint(0,0)]},
      {id: 2, zoneEdges: [new GeoPoint(0,0)]},
      {id: 3, zoneEdges: [new GeoPoint(0,0)]},
      {id: 23, zoneEdges: [new GeoPoint(0,0)]},
      {id: 33, zoneEdges: [new GeoPoint(0,0)]},
      {id: 34, zoneEdges: [new GeoPoint(0,0)]}

    ];

  }

  getRestrictedZones(): Observable<RestrictedZone[]>{
    return of(this.restrictedZones);
  }

}
