export class Drone {

  public id: string;
  public latitude: number;
  public longitude: number;
  public heading : number;

  constructor(id: string, latitude: number, longitude: number, heading_angle: number) {
  this.id = id;
  this.latitude = latitude;
  this.longitude = longitude;
  this.heading = heading_angle;
  }


}
