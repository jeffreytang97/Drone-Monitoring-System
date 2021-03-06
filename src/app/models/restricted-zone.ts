import {LatLong} from "./LatLong";

export class RestrictedZone {

  public id : string;
  public polygonPoints : LatLong[];
  public polygonBased : boolean;

 constructor(id: string, polygonPoints : LatLong[], polygonBased : boolean){
    this.id = id;
    this.polygonPoints = polygonPoints;
    this.polygonBased = polygonBased;
  }

  clearZone(){
   this.id = "";
   this.polygonPoints = [];
  }

  getLatitude(index: number){
    return this.polygonPoints[index].latitude;
  }

  getLongitude(index: number){
    return this.polygonPoints[index].longitude;
  }

}
