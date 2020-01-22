import {Component, OnInit} from '@angular/core';
import {DroneService} from "../../Services/drone/drone.service";
import {Drone} from "../../models/drone";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-drone-search',
  templateUrl: './drone-search.component.html',
  styleUrls: ['./drone-search.component.css']
})
export class DroneSearchComponent implements OnInit {

  searchTerm: string = "";
  drones: Drone[];
  filteredDrones: Observable<Drone[]>;

  constructor(private droneService: DroneService) {
  }

  ngOnInit() {

    this.drones = [];

    //On initialization, set the value of the drones to what is in the service
    this.getDrones();
  }

  getDrones() {
    //Subscription to the droneService's list of drones
    this.droneService.getDrones().subscribe(drones => {

      this.drones = drones;

      console.log(this.drones);

      if (Object.keys(this.drones).length > 0) {

        var filteredElements : Drone[] = drones.filter(i => this.filterValue(i.id));

        this.filteredDrones = new Observable<Drone[]>(observer => {

        filteredElements.forEach(entry => {
          //When the drone list in the service changes, it will change the displayed list too
          observer.next(filteredElements);
        })


        })

      }

    });
  }

  filterValue(id: number): boolean {
    //function to check whether a specific drone should be shown or not

    if (this.searchTerm == "" || this.searchTerm == null) { //If the search term is empty, show everything
      return true;
    }

    return id.toString().includes(this.searchTerm);

  }

  setFilterTerm(value: string) {
    //function to set the value of a new search term

    this.searchTerm = value;

    //When the searched term changes, the filtering will go again to
    //only show the results
    this.filteredDrones = new Observable<Drone[]>(observer => {
      observer.next(this.drones.filter(i => this.filterValue(i.id)));
    })

  }

  changeSelectedDrone(id: number) {
    //TODO : Link up with other portions to indicate a change in selection
  }

}
