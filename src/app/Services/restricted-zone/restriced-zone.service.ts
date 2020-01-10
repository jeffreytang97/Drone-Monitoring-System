import {Injectable} from '@angular/core';
import {RestrictedZone} from "../../models/restricted-zone";

@Injectable({
  providedIn: 'root'
})
export class RestricedZoneService {

  private restrictedZones: RestrictedZone[] = [];

  constructor() {
  }

  getRestrictedZones() {
    return this.restrictedZones;
  }
}
