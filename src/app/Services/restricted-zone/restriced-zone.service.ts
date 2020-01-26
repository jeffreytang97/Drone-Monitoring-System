import {Injectable} from '@angular/core';
import {RestrictedZone} from "../../models/restricted-zone";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Drone} from "../../models/drone";
import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class RestrictedZoneService {

  private restrictedZones: RestrictedZone[];
  observableZones: BehaviorSubject<RestrictedZone[]>;

  private currentlySelectedZoneId: string;
  observableCurrentlySelectedZoneId: BehaviorSubject<string>;

  constructor(db: AngularFireDatabase) {

    this.restrictedZones = [];
    this.observableZones = <BehaviorSubject<RestrictedZone[]>>new BehaviorSubject([]);

    this.currentlySelectedZoneId = null;
    this.observableCurrentlySelectedZoneId = <BehaviorSubject<string>>new BehaviorSubject(null);

    this.subscribeToDBZones(db);

  }

  subscribeToDBZones(db : AngularFireDatabase){
    db.list('/Zone_data').valueChanges().subscribe( DBData => {

      this.restrictedZones = [];

      DBData.forEach(data => {

        let locationSeperator = ",";

        // @ts-ignore
        let stringLatitudes : string[] = data.latitudes.split(locationSeperator);
        let numberLatitudes : number[] = [];

        stringLatitudes.forEach(entry => {
          numberLatitudes.push(Number(entry));
        });

        // @ts-ignore
        let stringLongitudes : string[] = data.longitudes.split(locationSeperator);
        let numberLongitudes : number[] = [];

        stringLongitudes.forEach(entry => {
          numberLatitudes.push(Number(entry));
        })

        // @ts-ignore
        let newZone: RestrictedZone = new RestrictedZone(data.id as number, numberLatitudes, numberLongitudes);
        this.add(newZone);

      })

    });
  }

  add(zone: RestrictedZone) {
    this.restrictedZones.push(zone);
    this.observableZones.next(Object.assign({}, this.restrictedZones));
  }

  remove(zone: RestrictedZone) {
    this.restrictedZones.splice(this.restrictedZones.indexOf(zone), 1);
    this.observableZones.next(Object.assign({}, this.restrictedZones));
  }

  getRestrictedZones(): Observable<RestrictedZone[]>{
    return this.observableZones.asObservable();
  }

  public setCurrentlySelectedZone(zoneId : string){
    this.currentlySelectedZoneId = zoneId;
    this.observableCurrentlySelectedZoneId.next(Object.assign({}, this.currentlySelectedZoneId));
  }

  getCurrentlySelectedZone(): Observable<string>{
    return this.observableCurrentlySelectedZoneId.asObservable();
  }

}
