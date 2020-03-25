import {Injectable} from '@angular/core';
import {RestrictedZone} from "../../models/restricted-zone";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {RestrictedZoneService} from "../restricted-zone/restricted-zone.service";

@Injectable({
  providedIn: 'root'
})
export class DatabaseInteractionService {

  zones : AngularFireList<any[]>;
  private restrictedZoneService: any;

  constructor(db : AngularFireDatabase) {

    this.zones = db.list('/Zone_data');
  }

  addNewZoneEntry(editedZone: RestrictedZone) {
    this.zones.push(RestrictedZoneService.dbSerialize(editedZone));
  }

}
