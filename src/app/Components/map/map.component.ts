import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {DroneService} from "../../Services/drone/drone.service";
import {Drone} from "../../models/drone";
import {Observable} from "rxjs";
import * as firebase from "firebase";
import {AngularFireDatabase} from 'angularfire2/database';
import LatLng = google.maps.LatLng;
import {RestrictedZoneService} from "../../Services/restricted-zone/restricted-zone.service";
import {RestrictedZone} from "../../models/restricted-zone";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  // Data initialization
  drones: Drone[];
  zones : RestrictedZone[];
  latitude: number;
  longitude: number;
  drone_id: string;
  heading: number;
  drone_coordinate = new google.maps.LatLng(this.latitude, this.longitude);
  marker_list: any[];
  zone_list: any[];
  current_marker = google.maps.Marker;
  currentlySelectedDroneID : string;
  currentlySelectedZoneId : string;

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

  constructor(private droneService: DroneService, private zoneService : RestrictedZoneService) {
  }

  ngOnInit() {
    this.drones = [];
    this.marker_list = [];
    this.zone_list = [];

    //On initialization, set the value of the drones to what is in the service and update the markers on the map

    this.subscribeToCurrentlySelectedDrone();
    this.subscribeToCurrentlySelectedZone();
    this.createMarkers();
    this.createZones();
    this.changeSelectedDrone(null);
  }

  private subscribeToCurrentlySelectedDrone(){
    this.droneService.getCurrentlySelectedDrone().subscribe(drone =>{
      if(drone != null){
        this.currentlySelectedDroneID = Object.values(drone).join("");
        if(this.map != null){

          for(let i = 0; i < this.drones.length; i++){
            if(this.drones[i].id === this.currentlySelectedDroneID){
              this.map.setCenter(new google.maps.LatLng(this.drones[i].latitude, this.drones[i].longitude));
              this.map.setZoom(this.mapOptions.zoom);
              break;
            }
          }

        }
      }
    })
  }

  private subscribeToCurrentlySelectedZone() {
    this.zoneService.getCurrentlySelectedZone().subscribe(zone => {

      if(zone != null){
        this.currentlySelectedZoneId = Object.values(zone).join("");
          if(this.map != null) {

            for(let i = 0; i < this.zones.length; i++){
              if(this.zones[i].id === this.currentlySelectedZoneId){
                this.map.setCenter(new google.maps.LatLng(this.zones[i].getCenter().latitude, this.zones[i].getCenter().longitude));
                this.map.setZoom(this.mapOptions.zoom);
              }
            }

          }
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

      this.setupMap();

    });
  }

  createZones(){

    this.zoneService.getRestrictedZones().subscribe(zones => {

      this.zones = [];
      Object.values(zones).forEach(value => {
        this.zones.push(value);
      });

      this.setupMap();

    });
  }

  onClickMarkers(){
    for (var j = 0; j < this.marker_list.length; j++){
      var current_marker = this.marker_list[j];
      var that = this;
      //Attach click event to the marker.
      (function (current_marker) {
          google.maps.event.addListener(current_marker, "click", function(e) {
              this.map.setZoom(that.mapOptions.zoom);
              this.map.setCenter(current_marker.getPosition());
              that.changeSelectedDrone(current_marker.getTitle());
          });
      })(current_marker);
      this.marker_list[j] = current_marker;
    }
  }

  private onClickZones() {
    for(var i = 0; i < this.zone_list.length; i++){
      var current_zone = this.zone_list[i];
      var zone = this.zones[i];
      var that = this;

      (function (current_zone) {
        google.maps.event.addListener(current_zone, "click", function(e) {
          this.map.setZoom(that.mapOptions.zoom);
          this.map.setCenter(new LatLng(zone.getCenter().latitude, zone.getCenter().longitude, false));
          that.changeSelectedZone(zone.id);
        });
      })(current_zone);
      this.zone_list[i] = current_zone;

    }
  }

  //Function to update the currently selected drone
  changeSelectedDrone(newSelectedID: string) {
    this.droneService.setCurrentlySelectedDrone(newSelectedID);
  }

  changeSelectedZone(newSelectedId : string){
    this.zoneService.setCurrentlySelectedZone(newSelectedId);
  }

  ngAfterViewInit() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.mapInitializer();
  }

  mapInitializer() {
    this.createMarkers();
    this.createZones();

  }

  private setupMap() {

    // this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    if(this.marker_list === undefined || this.marker_list.length == 0){
      // do nothing
    } else{
      for (var j = 0; j < this.marker_list.length; j++) {
        this.marker_list[j].setMap(null);
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

      var drone_marker_icon = "https://img.icons8.com/ios-glyphs/40/FF3434/drone.png";
      var marker = new google.maps.Marker({
        position: this.drone_coordinate,
        map: this.map,
        title: this.drone_id,
        icon: drone_marker_icon,
      });
      marker.setMap(this.map);

      // Store every marker in a list
      this.marker_list.push(marker);
    }

    this.onClickMarkers();

    for (var zone of this.zones) {

      var size_of_array = zone.polygonPoints.length;

      if(size_of_array > 0) {

        if (zone.polygonBased) {
          // Add the polygon zone to the map.
          var polygonCoords = [];
          for (var i = 0; i < size_of_array; i++) {
            var lat = zone.getLatitude(i);
            var lng = zone.getLongitude(i);
            polygonCoords.push({lat, lng});
          }

            // Construct the polygon.
            var zonePolygon = new google.maps.Polygon({
              paths: polygonCoords,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.10,
              map: this.map
            });

          this.zone_list.push(zonePolygon);

        } else {
          // Add the circle zone to the map.
          var center_lat = 0;
          var center_lng = 0;

          // For the radius, get the latitude or longitude of index 1. It is the same value
          var circle_radius = 0;

          if (zone.polygonPoints.length == 2) {
            center_lat = zone.getLatitude(0);
            center_lng = zone.getLongitude(0);

            // For the radius, get the latitude or longitude of index 1. It is the same value
            circle_radius = this.measure(zone.getLatitude(0), zone.getLongitude(0), zone.getLatitude(1), zone.getLongitude(1));
          }

            var zoneCircle = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.10,
              map: this.map,
              center: {lat: center_lat, lng: center_lng},
              radius: circle_radius,
            });

            this.zone_list.push(zoneCircle);

        }
      }
    }

    this.onClickZones();

    let that = this;
    google.maps.event.addListener(this.map, "zoom_changed", function (event) {
      that.mapOptions = {
        center: that.map.getCenter(),
        zoom: that.map.getZoom(),
      };
    })

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
