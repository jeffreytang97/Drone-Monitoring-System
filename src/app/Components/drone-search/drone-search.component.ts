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

  filterTerm : string = "";

  control = new FormControl();

  drones : Drone[];
  filteredDrones : Observable<Drone[]>;

  constructor(private droneService: DroneService) {  }

  ngOnInit() {
    this.getDrones();
  }

  getDrones(){
    this.droneService.getDrones().subscribe(drones => {
      this.drones = drones;
      this.filteredDrones = new Observable<Drone[]>(observer => {
        observer.next(drones.filter(i => this.filterValue(i.id)));
      })
    });
  }

  filterValue(id : number) : boolean {
    if(this.filterTerm == "" || this.filterTerm == null){
      return true;
    }

    if(id.toString().includes(this.filterTerm)) {
      return true;
    }
    return false;
  }

  printID(id: number) {
    document.write("Drone Clicked: " + id);
  }

  setFilterTerm(value: string){
    this.filterTerm = value;

    this.filteredDrones = new Observable<Drone[]>(observer => {
      observer.next(this.drones.filter(i => this.filterValue(i.id)));
    })

  }

}
