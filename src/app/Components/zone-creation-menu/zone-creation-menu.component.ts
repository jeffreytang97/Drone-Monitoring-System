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

  zoneName: string;

  //List of points for Square and Freeform views
  displayedPoints: Observable<LatLong[]>;

  circleSelection = 0;

  constructor(private restrictedZoneService: RestrictedZoneService, private restrictedZoneCreationService: RestrictedZoneCreationService, private databaseInteractionService: DatabaseInteractionService) {
  }

  ngOnInit() {

    this.editedZone = new RestrictedZone("", [], null);

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
        this.updateInformationDisplayed();
      } else {
        if (this.circleSelection == 0) {
          this.editedZone.polygonPoints[this.circleSelection] = new LatLong(latitude, longitude);
        } else {
          if (this.editedZone.polygonPoints[0] !== null && this.editedZone.polygonPoints[0].latitude !== null &&
            this.editedZone.polygonPoints[0].longitude !== null) {
            let distance = Math.sqrt(Math.pow(this.editedZone.polygonPoints[0].latitude - latitude, 2) + Math.pow(this.editedZone.polygonPoints[0].longitude - longitude, 2));
            this.editedZone.polygonPoints[this.circleSelection] = new LatLong(distance, distance);
          }
        }

        this.updateInformationDisplayed();
      }
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

    if (!this.isZoneEmpty()) {
      if (this.editedZone.polygonBased) {
        let sentPoints = this.editedZone;
        sentPoints.polygonPoints.push(this.editedZone.polygonPoints[0]);
        this.restrictedZoneCreationService.setShapes([sentPoints]);
      } else {
        this.restrictedZoneCreationService.setShapes([this.editedZone]);
      }

    }

  }

  clearEditedZone() {
    this.editedZone.clearZone();
    this.zoneName = "";
    this.updateInformationDisplayed();
  }

  saveEditedZone() {
    //TODO: uncomment this section when the section is 100% done
    //This opens access to writing in the DB

    // this.databaseInteractionService.addNewZoneEntry(this.editedZone);
    // this.clearEditedZone();
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
    return this.isZoneEmpty() || this.zoneName === null || this.zoneName === "";
  }

  updateZoneName(zoneName: string) {
    this.zoneName = zoneName;
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
}
