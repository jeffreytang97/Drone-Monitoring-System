import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-info-screen',
  templateUrl: './info-screen.component.html',
  styleUrls: ['./info-screen.component.css']
})
export class InfoScreenComponent implements OnInit {

  droneData: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.droneData = db.list('/Drone_data').valueChanges();
  }

  ngOnInit() {
  }

}
