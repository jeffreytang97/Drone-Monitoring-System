import {Component, OnInit} from '@angular/core';
import {RestrictedZoneService} from "../../Services/restricted-zone/restricted-zone.service";
import {RestrictedZone} from "../../models/restricted-zone";
import {Observable} from "rxjs";
import {DatabaseInteractionService} from "../../Services/database-interaction/database-interaction.service";

@Component({
  selector: 'app-zone-creation',
  templateUrl: './zone-creation.component.html',
  styleUrls: ['./zone-creation.component.css']
})
export class ZoneCreationComponent implements OnInit {

  zones: RestrictedZone[];
  editedZone : RestrictedZone;

  //List of points for Square and Freeform views
  displayedPoints : Observable<RestrictedZone>;

  //

  currentlySelectedMode : String;

  constructor(private restrictedZoneService : RestrictedZoneService, private databaseInteractionService : DatabaseInteractionService) {
  }

  ngOnInit() {

    this.subscribeToZones();

  }

  subscribeToZones(){
    //Subscription to the droneService's list of drones
    this.restrictedZoneService.getRestrictedZones().subscribe(zones => {

      this.zones = []; //When the zone list in the service changes, it will be reset here

      Object.values(zones).forEach(value => { //Objects from the service need to be transformed to be used
        this.zones.push(value);
      });

    });
  }

  addPoint(latitude : number, longitude : number){
    this.editedZone.zoneLongitudes.push(longitude);
    this.editedZone.zoneLatitudes.push(latitude);
    this.updatePointsList();
  }

  removePoint(latitude : number, longitude : number){
    this.editedZone.zoneLongitudes.splice(this.editedZone.zoneLongitudes.indexOf(longitude),1);
    this.editedZone.zoneLongitudes.splice(this.editedZone.zoneLatitudes.indexOf(latitude),1);
    this.updatePointsList();
  }

  updatePointsList(){
    this.displayedPoints = new Observable<RestrictedZone>(observer => {
      observer.next(this.editedZone);
    });
  }

  clearEditesZone(){
    this.editedZone.clearZone();
  }

  saveEditedZone(){
    this.databaseInteractionService.addNewZoneEntry(this.editedZone);
  }

  changeCurrentlySelectedMode(mode : string){
    this.currentlySelectedMode = mode;
  }

}
