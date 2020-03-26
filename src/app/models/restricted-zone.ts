import {LatLong} from "./LatLong";

export class RestrictedZone {

  public id : string;
  public polygonPoints : LatLong[];
  public polygonBased : boolean;
  public radius : number;
  public center : LatLong;

  public isEdited : boolean;

 constructor(id: string, polygonPoints : LatLong[], polygonBased : boolean, radius:number, center : LatLong){
    this.id = id;
    this.polygonPoints = polygonPoints;
    this.polygonBased = polygonBased;
    this.radius = radius;
    this.center = center;
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

  calculateCenter(){

   if(this.polygonBased){


   let maxLat = -360;
   let minLat = 360;
   let maxLong = -360;
   let minLong = 360;

   for(let point of this.polygonPoints){

     if(point.latitude > maxLat){
        maxLat = point.latitude;
     }

     if(point.latitude < minLat){
       minLat = point.latitude;
     }

     if(point.longitude > maxLong){
       maxLong = point.longitude;
     }

     if(point.longitude < minLong){
       minLong = point.longitude;
     }

   }

   this.center = new LatLong((maxLat + minLat)/2,(maxLong + minLong)/2);

   }
   else{
     this.center = new LatLong(this.getLatitude(0), this.getLongitude(0));
   }

  }

  calculateRadius(){
   let max = -1;

   if(this.center.longitude != null && this.center.latitude != null){

     for(let point of this.polygonPoints){
       let distance = this.calculateDistance(point, this.center);
       if(distance > max){
         max = distance;
       }

     }

     this.radius = max;

   }

  }

  calculateDistance(a : LatLong, b : LatLong){
   return Math.sqrt(Math.pow(a.latitude - b.latitude, 2) + Math.pow(a.longitude - b.longitude, 2))
  }

  getCenter(){
   return this.center;
  }

  getRadius(){
   return this.radius;
  }

  setIsEdited(isEdited : boolean){
   this.isEdited = true;
  }

}
