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

  constructor(private restrictedZoneService : RestrictedZoneService) {
  }

  ngOnInit() {
    this.getZones();
  }

  getZones(){
    //Subscription to the droneService's list of drones
    this.restrictedZoneService.getRestrictedZones().subscribe(zones => {

      this.zones = zones; //When the drone list in the service changes, it will change here too

      //When the drone list in the service changes, it will change the displayed list too
      this.filteredZones = new Observable<RestrictedZone[]>(observer => {
        observer.next(zones.filter(i => this.filterValue(i.id)));
      })

    });
  }

  filterValue(id: number): boolean {
    //function to check whether a specific drone should be shown or not

    if (this.searchTerm == "" || this.searchTerm == null) { //If the search term is empty, show everything
      return true;
    }

    return id.toString().includes(this.searchTerm);
  }

  setFilterTerm(value: string){
    //function to set the value of a new search term

    this.searchTerm = value;

    //When the searched term changes, the filtering will go again to
    //only show the results
    this.filteredZones = new Observable<RestrictedZone[]>(observer => {
      observer.next(this.zones.filter(i => this.filterValue(i.id)));
    })
  }

  changeSelectedZone(id : number){
    //TODO : Link up with other portions to indicate a change in selection
  }

}
