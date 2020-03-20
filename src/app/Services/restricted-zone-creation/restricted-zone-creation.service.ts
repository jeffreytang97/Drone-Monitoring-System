import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {RestrictedZone} from "../../models/restricted-zone";
import {LatLong} from "../../models/LatLong";

@Injectable({
  providedIn: 'root'
})
export class RestrictedZoneCreationService {

  //Restricted zone array to be drawn
  private shapes : RestrictedZone[];
  observableShape : BehaviorSubject<RestrictedZone[]>;

  //Point to be added to the restricted zone menu from map
  private mapPoint : LatLong[];
  observableMapPoint : BehaviorSubject<LatLong[]>;

  setMapPoint(latitude : number, longitude : number){
    this.mapPoint = [new LatLong(latitude, longitude)];
    this.observableMapPoint.next(Object.assign({}, this.mapPoint));
  }

  setShapes(shapes : RestrictedZone[]){
    this.shapes = shapes;
    this.observableShape.next(Object.assign({}, this.shapes));
  }

  getShapes(){
    return this.observableShape.asObservable();
  }

  getMapPoint(){
    return this.observableMapPoint.asObservable();
  }

  constructor() {
    this.shapes = [];
    this.observableShape = <BehaviorSubject<RestrictedZone[]>> new BehaviorSubject(this.shapes);

    this.mapPoint = [new LatLong(0,0)];
    this.observableMapPoint = <BehaviorSubject<LatLong[]>> new BehaviorSubject(this.mapPoint);

  }
}
