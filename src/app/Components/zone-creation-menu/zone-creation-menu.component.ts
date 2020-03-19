import { Component, OnInit } from '@angular/core';
import {RestrictedZone} from "../../models/restricted-zone";
import {Observable} from "rxjs";
import {RestrictedZoneService} from "../../Services/restricted-zone/restricted-zone.service";
import {DatabaseInteractionService} from "../../Services/database-interaction/database-interaction.service";
import {LatLong} from "../../models/LatLong";
import {Circle} from "../../models/Circle";

@Component({
  selector: 'app-zone-creation-menu',
  templateUrl: './zone-creation-menu.component.html',
  styleUrls: ['./zone-creation-menu.component.css']
})
export class ZoneCreationMenuComponent implements OnInit {


  zones: RestrictedZone[];
  editedZone : RestrictedZone;

  zoneName : string;

  //List of points for Square and Freeform views
  displayedPoints : Observable<LatLong[]>;

  //Circle object displayed
  displayedCircle : Observable<Circle[]>;

  currentlySelectedMode : String;

  constructor(private restrictedZoneService : RestrictedZoneService, private databaseInteractionService : DatabaseInteractionService) {
  }

  ngOnInit() {

    this.editedZone = new RestrictedZone("", [], new Circle(null, null), null);

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
    this.editedZone.polygonPoints.push(new LatLong(latitude, longitude));
    this.updateInformationDisplayed();
  }

  removePoint(latitude : number, longitude : number){
    let newLocation = new LatLong(latitude, longitude);

    this.editedZone.polygonPoints.splice(this.editedZone.polygonPoints.indexOf(newLocation), 1);
    this.updateInformationDisplayed();
  }

  updateCircle(latitude : number, longitude : number, radius : number) {

    this.editedZone.circle = new Circle(new LatLong(latitude, longitude), radius);
    this.updateInformationDisplayed();
  }

  updateInformationDisplayed(){
    if(this.currentlySelectedMode !== "Circle"){
      this.displayedPoints = new Observable<LatLong[]>(observer => {
        observer.next(this.editedZone.polygonPoints);
      });
    }
    else {
      this.displayedCircle = new Observable<Circle[]>(observer => {
        observer.next([this.editedZone.circle]);
      })
    }
  }

  clearEditedZone(){
    this.editedZone.clearZone();
    //TODO: Need to clear the Zone Name text field
  }

  saveEditedZone(){
    //TODO: uncomment this section when the section is 100% done
    //This opens access to writing in the DB

    // this.databaseInteractionService.addNewZoneEntry(this.editedZone);
    // this.clearEditedZone();
  }

  changeCurrentlySelectedMode(mode : string){
    this.currentlySelectedMode = mode;
    this.editedZone.polygonBased = mode !== "Circle";
  }

  isZoneEmpty() {
    if(this.editedZone.polygonBased){
      return this.editedZone.polygonPoints.length === 0;
    } else {
      return this.editedZone.circle._geoLocation === null && this.editedZone.circle._radius === null;
    }
  }

  isSaveDisabled(){
    return this.isZoneEmpty() || this.zoneName === null || this.zoneName === "";
  }

  updateZoneName(zoneName: string) {
    this.zoneName = zoneName;
  }
}
