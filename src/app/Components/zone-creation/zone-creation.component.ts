import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {RestrictedZoneService} from "../../Services/restricted-zone/restricted-zone.service";
import {RestrictedZoneCreationService} from "../../Services/restricted-zone-creation/restricted-zone-creation.service";
import {RestrictedZone} from "../../models/restricted-zone";

@Component({
  selector: 'app-zone-creation',
  templateUrl: './zone-creation.component.html',
  styleUrls: ['./zone-creation.component.css']
})
export class ZoneCreationComponent implements OnInit {

  @ViewChild('staticMapContainer', {static: false}) zone_map: ElementRef;

  // Data initialization
  restricted_zones: RestrictedZone[];

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


  constructor(private restrictedZoneCreationService: RestrictedZoneCreationService, private restrictedZoneService: RestrictedZoneService) {
  }

  ngOnInit() {
    this.subscribeToZones();
  }

  ngAfterViewInit() {
    this.subscribeToZones();
    // this.sendCoordinatePoints();
  }

  subscribeToZones() {
    //Subscription to the zone creation service's map point
    this.restrictedZoneCreationService.getShapes().subscribe(zones => {

      this.restricted_zones = []; //When the zone list in the service changes, it will be reset here

      Object.values(zones).forEach(value => { //Objects from the service need to be transformed to be used
        this.restricted_zones.push(value);
      });

      this.mapInitializer();

    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.zone_map.nativeElement, this.mapOptions);

    for (var zone of this.restricted_zones) {

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

          if(zone.isEdited == null || zone.isEdited == false){
            // Construct the polygon.
            var zonePolygon = new google.maps.Polygon({
              paths: polygonCoords,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map: this.map
            });
          }
          else{
            // Construct the polygon.
            var zonePolygon = new google.maps.Polygon({
              paths: polygonCoords,
              strokeColor: '#0042ff',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#0042ff',
              fillOpacity: 0.35,
              map: this.map
            });
          }

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
            circle_radius = zone.getLatitude(1);
          }

          if(zone.isEdited == null || zone.isEdited == false){
            var zoneCircle = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map: this.map,
              center: {lat: center_lat, lng: center_lng},
              radius: circle_radius,
            });
          }
          else{
            var zoneCircle = new google.maps.Circle({
              strokeColor: '#0042ff',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#0042ff',
              fillOpacity: 0.35,
              map: this.map,
              center: {lat: center_lat, lng: center_lng},
              radius: circle_radius,
            });
          }


        }
      }
    }

    this.sendCoordinatePoints();

  }

  sendCoordinatePoints() {
    let that = this;
    // When right-click on the map, it will return coordinates
    google.maps.event.addListener(this.map, "rightclick", function (event) {

      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      that.restrictedZoneCreationService.setMapPoint(lat, lng);
      // populate yor box/field with lat, lng
      //alert("Lat=" + lat + "; Lng=" + lng);
    });

    google.maps.event.addListener(this.map, "drag", function (event) {
      that.mapOptions = {
        center: that.map.getCenter(),
        zoom: that.map.getZoom(),
      };
    });


    google.maps.event.addListener(this.map, "zoom_changed", function (event) {
      that.mapOptions = {
        center: that.map.getCenter(),
        zoom: that.map.getZoom(),
      };
    })

  }

}
