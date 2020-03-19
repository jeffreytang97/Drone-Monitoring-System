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
        this.createMarkers();
    }

    mapInitializer() {
      this.map = new google.maps.Map(this.zone_map.nativeElement, this.mapOptions);

      // This is just an example
      var citymap = {
            chicago: {
              center: {lat: 41.878, lng: -87.629},
              population: 2714856
            },
            newyork: {
              center: {lat: 40.714, lng: -74.005},
              population: 8405837
            },
            losangeles: {
              center: {lat: 34.052, lng: -118.243},
              population: 3857799
            },
            vancouver: {
              center: {lat: 49.25, lng: -123.1},
              population: 603502
            }
          };
      for (var city in citymap) {
          // Add the circle for this city to the map.
          var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.map,
            center: citymap[city].center,
            radius: Math.sqrt(citymap[city].population) * 100
          });
    }
  }

  createMarkers(){
    // When right-click on the map, it will return coordinates
    google.maps.event.addListener(this.map, "rightclick", function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        // populate yor box/field with lat, lng
        alert("Lat=" + lat + "; Lng=" + lng);
    });
  }
}
