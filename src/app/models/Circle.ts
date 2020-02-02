import {GeoLocation} from "./GeoLocation";

export class Circle {
  public _geoLocation: GeoLocation;
  public _radius: number;

  constructor(geoLocation : GeoLocation, radius: number){
    this._geoLocation = geoLocation;
    this._radius = radius;
  }

  get geoLocation(): GeoLocation {
    return this._geoLocation;
  }

  get radius(): number {
    return this._radius;
  }
}
