import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {DroneService} from "../../Services/drone/drone.service";
import {Drone} from "../../models/drone";
import {Observable} from "rxjs";
import * as firebase from "firebase";
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  // Data initialization
  drones: Drone[];
  latitude: number;
  longitude: number;
  drone_id: string;
  heading: number;
  drone_coordinate = new google.maps.LatLng(this.latitude, this.longitude);
  marker_list: any[];
  current_marker = google.maps.Marker
  currentlySelectedDroneID : string;

  // Create a new map variable that contains the Google Maps API along with latitude and longitude values
  map: google.maps.Map;
  lat = 45.505331312;
  lng = -73.55249779;

  // Create a coordinate variable to use our latitude and longitude
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  // Create a mapOptions variable, initialize map in Montreal
  mapOptions: google.maps.MapOptions = {
        center: this.coordinates,
        zoom: 8,
      };

  constructor(private droneService: DroneService) {
  }

  ngOnInit() {
    this.drones = [];

    //On initialization, set the value of the drones to what is in the service and update the markers on the map
    this.createMarkers();
    this.marker_list = [];
    this.subscribeToCurrentlySelectedDrone();
  }

  private subscribeToCurrentlySelectedDrone(){
    this.droneService.getCurrentlySelectedDrone().subscribe(drone =>{
      if(drone != null){
        this.currentlySelectedDroneID = Object.values(drone)[0];
      }
    })
  }

  createMarkers() {
    // Subscription to the droneService's list of drones
    this.droneService.getDrones().subscribe(drones => {
      this.drones = [];
      Object.values(drones).forEach(value =>{
        this.drones.push(value);
      });

      if(this.marker_list === undefined || this.marker_list.length == 0){
        // do nothing
      } else{
        for (var j = 0; j < this.marker_list.length; j++) {
          this.marker_list[j].setMap(null);
          //this.marker_list[j].setPosition(this.drone_coordinate);
          //this.marker_list[j].setMap(this.map);
        }
        // re-initialize the list everytime a drone location is updated
        this.marker_list = [];
      }

      for (var i = 0; i < this.drones.length; i++) {
        this.drone_id = this.drones[i].id;
        this.latitude = this.drones[i].latitude;
        this.longitude = this.drones[i].longitude;
        this.heading = this.drones[i].heading;
        this.drone_coordinate = new google.maps.LatLng(this.latitude, this.longitude);

        var marker = new google.maps.Marker({
          position: this.drone_coordinate,
          map: this.map,
          title: this.drone_id,
          });
        marker.setMap(this.map);
        // Store every marker in a list
        this.marker_list.push(marker);
      }
    });
  }

  ngAfterViewInit() {
      this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
    this.mapOptions);
    this.createMarkers();
  }

  //Function to update the currently selected drone
  changeSelectedDrone(newSelectedID: string) {
    this.droneService.setCurrentlySelectedDrone(newSelectedID);
  }

}
