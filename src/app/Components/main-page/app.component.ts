import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'drone-monitoring-website';
  drone_data: Observable<any[]>;
  constructor(db: AngularFireDatabase){
    this.drone_data = db.list('/Drone_data').valueChanges()
    console.log(this.drone_data)
  }
}
