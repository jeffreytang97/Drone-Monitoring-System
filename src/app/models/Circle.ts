import {LatLong} from "./LatLong";

export class Circle {
  public _geoLocation: LatLong;
  public _radius: number;

  constructor(geoLocation : LatLong, radius: number){
    this._geoLocation = geoLocation;
    this._radius = radius;
  }

  get geoLocation(): LatLong {
    return this._geoLocation;
  }

  get radius(): number {
    return this._radius;
  }
}
