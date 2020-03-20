export class LatLong {
  private _latitude: number;
  private _longitude: number;

  constructor(latitude: number, longitude: number) {
    this._latitude = latitude;
    this._longitude = longitude;
  }

  get latitude(): number {
    return this._latitude;
  }

  get longitude(): number {
    return this._longitude;
  }

  setLatitude(latitude : number){
    this._latitude = latitude;
  }

  setLongitude(longitude : number){
    this._longitude = longitude;
  }
}
