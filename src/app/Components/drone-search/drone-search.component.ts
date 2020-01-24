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

  private currentlySelectedDroneId: string;

  constructor(private droneService: DroneService) {
  }

  ngOnInit() {

    this.drones = [];
    this.currentlySelectedDroneId = null;

    //On initialization, subscribe the value of the drones to what is in the service
    this.subscribeToDrones();

    //On initialization, subscribe the value of the currently selected drone to what is in the service
    this.subscribeToCurrentlySelectedDrone();
  }

  subscribeToDrones() {
    //Subscription to the droneService's list of drones
    this.droneService.getDrones().subscribe(drones => {

      this.drones = []; //When the drone list in the service changes, it will be reset here

      Object.values(drones).forEach(value => { //Objects from the service need to be transformed to be used
        this.drones.push(value);
      });

      if (this.drones.length > 0) {//Make sure you don't filter an empty array

        //Make an array with the filter positive elements
        var filteredElements: Drone[] = this.drones.filter(i => this.filterValue(i));

        //Create an observable object with the filter positive items
        this.filteredDrones = new Observable<Drone[]>(observer => {

          observer.next(filteredElements);

        })

      }

    });
  }

  private subscribeToCurrentlySelectedDrone() {
    this.droneService.getCurrentlySelectedDrone().subscribe(drone => {
      this.currentlySelectedDroneId = Object.values(drone)[0];
    })
  }

  filterValue(drone: Drone): boolean {
    //function to check whether a specific drone should be shown or not

    if (this.searchTerm == "" || this.searchTerm == null) { //If the search term is empty, show everything
      return true;
    }

    return drone.id.includes(this.searchTerm);

  }

  setFilterTerm(value: string) {
    //function to set the value of a new search term

    this.searchTerm = value;

    //When the searched term changes, the filtering will go again to
    //only show the results
    this.filteredDrones = new Observable<Drone[]>(observer => {
      observer.next(this.drones.filter(i => this.filterValue(i)));
    })

  }

  changeSelectedDrone(drone: string) {
    this.droneService.setCurrentlySelectedDrone(drone);
  }

}
