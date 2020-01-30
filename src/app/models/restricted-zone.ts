import {Circle} from "./Circle";
import {GeoLocation} from "./GeoLocation";

export class RestrictedZone {

  public id : string;
  public geoLocations : GeoLocation[];
  public circle : Circle;
  public geoLocationBased : boolean;

 constructor(id: string, geoLocation : GeoLocation[], circle: Circle, geoLocationBased : boolean){
    this.id = id;
    this.geoLocations = geoLocation;
    this.circle = circle;
    this.geoLocationBased = geoLocationBased;
  }

  clearZone(){
   this.id = "";
   this.geoLocations = [];
   this.circle = new Circle(null, null);
  }

}
