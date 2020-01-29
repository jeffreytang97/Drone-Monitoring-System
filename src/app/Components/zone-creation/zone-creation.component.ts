import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-zone-creation',
  templateUrl: './zone-creation.component.html',
  styleUrls: ['./zone-creation.component.css']
})
export class ZoneCreationComponent implements OnInit {

   @ViewChild('staticMapContainer', {static: false}) zone_map: ElementRef;

    // Data initialization

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

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.mapInitializer();
    }

    mapInitializer() {
      this.map = new google.maps.Map(this.zone_map.nativeElement,
      this.mapOptions);
    }
}
