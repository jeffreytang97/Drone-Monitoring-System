import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  // Create a new map variable that contains the Google Maps API along with latitude and longitude values
  map: google.maps.Map;
  lat = 45.505331312;
  lng = -73.55249779;

  // Create a coordinate variable to use our latitude and longtitude
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  // Create a mapOptions variable
  mapOptions: google.maps.MapOptions = {
        center: this.coordinates,
        zoom: 8,
      };

  // Create a marker
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  constructor() {
  }

  ngOnInit() {
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
    this.mapOptions);
    this.marker.setMap(this.map);
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }
}
