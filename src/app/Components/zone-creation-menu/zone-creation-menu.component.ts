import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RestrictedZone} from "../../models/restricted-zone";
import {Observable} from "rxjs";
import {RestrictedZoneService} from "../../Services/restricted-zone/restricted-zone.service";
import {DatabaseInteractionService} from "../../Services/database-interaction/database-interaction.service";
import {LatLong} from "../../models/LatLong";
import {RestrictedZoneCreationService} from "../../Services/restricted-zone-creation/restricted-zone-creation.service";

@Component({
  selector: 'app-zone-creation-menu',
  templateUrl: './zone-creation-menu.component.html',
  styleUrls: ['./zone-creation-menu.component.css']
})
export class ZoneCreationMenuComponent implements OnInit {


  zones: RestrictedZone[];
  editedZone: RestrictedZone;
  observableEditedZone: Observable<RestrictedZone[]>;

  mapPoint: LatLong[];

  //List of points for Square and Freeform views
  displayedPoints: Observable<LatLong[]>;

  circleSelection = 0;

  constructor(private restrictedZoneService: RestrictedZoneService, private restrictedZoneCreationService: RestrictedZoneCreationService, private databaseInteractionService: DatabaseInteractionService) {
  }

  ngOnInit() {

    this.editedZone = new RestrictedZone("", [], true, 0, new LatLong(0,0));

    this.subscribeToZones();
    this.subscribeToPoints();
  }

  subscribeToZones() {
    //Subscription to the zonesService's list of zones
    this.restrictedZoneService.getRestrictedZones().subscribe(zones => {

      this.zones = []; //When the zone list in the service changes, it will be reset here

      Object.values(zones).forEach(value => { //Objects from the service need to be transformed to be used
        this.zones.push(value);
      });

      this.updateInformationDisplayed();
    });
  }

  subscribeToPoints() {
    //Subscription to the zone creation service's map point
    this.restrictedZoneCreationService.getMapPoint().subscribe(points => {

      this.mapPoint = []; //When the zone list in the service changes, it will be reset here

      Object.values(points).forEach(value => { //Objects from the service need to be transformed to be used
        this.mapPoint.push(value);
      });

      this.addPoint(this.mapPoint[0].latitude, this.mapPoint[0].longitude);

    });
  }

  addPoint(latitude: number, longitude: number) {
    if (this.editedZone.polygonBased != null) {
      if (this.editedZone.polygonBased) {
        this.editedZone.polygonPoints.push(new LatLong(latitude, longitude));
      } else {
        if (this.circleSelection == 0) {
          this.editedZone.polygonPoints[this.circleSelection] = new LatLong(latitude, longitude);

        } else {
          if (this.editedZone.polygonPoints[0] !== null) {
            let distance = this.measure(this.editedZone.polygonPoints[0].latitude, this.editedZone.polygonPoints[0].longitude, latitude, longitude);
            this.editedZone.polygonPoints[this.circleSelection] = new LatLong(distance, distance);
          }
        }
      }

      this.updateInformationDisplayed();

    }
  }

  removePoint(index: number) {
    this.editedZone.polygonPoints.splice(index, 1);
    this.updateInformationDisplayed();
  }

  updateInformationDisplayed() {

    this.displayedPoints = new Observable<LatLong[]>(observer => {
      observer.next(this.editedZone.polygonPoints);
    });

    this.observableEditedZone = new Observable<RestrictedZone[]>(observer => {
      observer.next([this.editedZone]);
    });


    if(this.zones.length != 0){
    //TODO: SETUP SYSTEM TO SELECT SPECIFIC ZONE TO DISPLAY OR NOT
    let displayedZones = this.zones;
    displayedZones.push(this.editedZone);

      this.restrictedZoneCreationService.setShapes(displayedZones);
    }

  }

  clearEditedZone() {
    this.editedZone.clearZone();
    this.updateInformationDisplayed();
  }

  saveEditedZone() {
    //TODO: uncomment this section when the section is 100% done
    //This opens access to writing in the DB

    this.editedZone.calculateCenter();
    this.editedZone.calculateRadius();

    this.databaseInteractionService.addNewZoneEntry(this.editedZone);
    this.clearEditedZone();

    this.updateInformationDisplayed();
  }

  changeCurrentlySelectedMode(mode: string) {
    this.editedZone.polygonBased = mode !== "Circle";
    this.editedZone.clearZone();
  }

  isZoneEmpty() {
    if (this.editedZone.polygonBased) {
      return this.editedZone.polygonPoints.length < 2;
    } else {
      return this.editedZone.polygonPoints.length != 2;
    }
  }

  isSaveDisabled() {
    return this.isZoneEmpty() || this.editedZone.id === null || this.editedZone.id === "";
  }

  updateZoneName(zoneName: string) {
    this.editedZone.id = zoneName;
  }

  setCircleSelection(number: number) {
    this.circleSelection = number;
  }

  modifyPoint(index: number, latOrLong: number, value: string) {
    if (latOrLong == 0) {
      this.editedZone.polygonPoints[index].setLatitude(Number(value));
    } else {
      this.editedZone.polygonPoints[index].setLongitude(Number(value));
    }
    this.updateInformationDisplayed();
  }

  measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
  }

}
