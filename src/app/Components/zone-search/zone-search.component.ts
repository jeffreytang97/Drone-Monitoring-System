import {Component, OnInit} from '@angular/core';
import {RestrictedZoneService} from "../../Services/restricted-zone/restriced-zone.service";
import {RestrictedZone} from "../../models/restricted-zone";
import {Observable} from "rxjs";
import {Drone} from "../../models/drone";

@Component({
  selector: 'app-zone-search',
  templateUrl: './zone-search.component.html',
  styleUrls: ['./zone-search.component.css']
})
export class ZoneSearchComponent implements OnInit {

  searchTerm: string = "";
  zones: RestrictedZone[];
  filteredZones: Observable<RestrictedZone[]>;

  currentlySelectedZoneId : string;

  constructor(private restrictedZoneService : RestrictedZoneService) {
  }

  ngOnInit() {

    this.zones = [];

    //On initialization, subscribe the value of the zones to what is in the service
    this.subscribeToZones();

    //On initialization, subscribe the value of the currently selected zone to what is in the service
    this.subscribeToCurrentlySelectedZone();
  }

  subscribeToZones(){
    //Subscription to the droneService's list of drones
    this.restrictedZoneService.getRestrictedZones().subscribe(zones => {

      this.zones = []; //When the zone list in the service changes, it will be reset here

      Object.values(zones).forEach(value => { //Objects from the service need to be transformed to be used
        this.zones.push(value);
      });

      if(this.zones.length > 0){ //Make sure you don't filter an empty array

        //Make an array with the filter positive elements
        var filteredElements : RestrictedZone[] = this.zones.filter(i => this.filterValue(i));

        //Create an observable object with the filter positive items
        this.filteredZones = new Observable<RestrictedZone[]>(observer => {

          observer.next(filteredElements);

        })


      }

    });
  }

  private subscribeToCurrentlySelectedZone() {

    this.restrictedZoneService.getCurrentlySelectedZone().subscribe(zone => {
      if(zone != null){
        this.currentlySelectedZoneId = Object.values(zone)[0];
      }

    })

  }

  filterValue(zone : RestrictedZone): boolean {
    //function to check whether a specific drone should be shown or not

    if (this.searchTerm == "" || this.searchTerm == null) { //If the search term is empty, show everything
      return true;
    }

    return zone.id.toString().includes(this.searchTerm);
  }

  setFilterTerm(value: string){
    //function to set the value of a new search term

    this.searchTerm = value;

    //When the searched term changes, the filtering will go again to
    //only show the results
    this.filteredZones = new Observable<RestrictedZone[]>(observer => {
      observer.next(this.zones.filter(i => this.filterValue(i)));
    })
  }

  changeSelectedZone(zoneId:string){
    this.restrictedZoneService.setCurrentlySelectedZone(zoneId);
  }


}
