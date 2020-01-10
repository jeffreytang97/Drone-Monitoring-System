import { Injectable } from '@angular/core';
import {Drone} from "../../models/drone";

@Injectable({
  providedIn: 'root'
})
export class DroneService {

  private drones: Drone[] = [];

  constructor() { }

  getDrones() {
    return this.drones;
  }

}
