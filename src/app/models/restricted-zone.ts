import {Circle} from "./Circle";
import {LatLong} from "./LatLong";

export class RestrictedZone {

  public id : string;
  public polygonPoints : LatLong[];
  public circle : Circle;
  public polygonBased : boolean;

 constructor(id: string, geoLocation : LatLong[], circle: Circle, geoLocationBased : boolean){
    this.id = id;
    this.polygonPoints = geoLocation;
    this.circle = circle;
    this.polygonBased = geoLocationBased;
  }

  clearZone(){
   this.id = "";
   this.polygonPoints = [];
   this.circle = new Circle(null, null);
  }

  getLatitude(index: number){
    return this.polygonPoints[index].latitude;
  }

  getLongitude(index: number){
    return this.polygonPoints[index].longitude;
  }

}
