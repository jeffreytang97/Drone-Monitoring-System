import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from '../../../environments/environment'
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {ZoneSearchModule} from "../zone-search/zone-search.module";
import {TopBarModule} from "../top-bar/top-bar.module";
import {MapModule} from "../map/map.module";
import {InfoScreenModule} from "../info-screen/info-screen.module";
import {DroneSearchModule} from "../drone-search/drone-search.module";
import {ZoneCreationModule} from "../zone-creation/zone-creation.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    ZoneSearchModule,
    TopBarModule,
    MapModule,
    InfoScreenModule,
    DroneSearchModule,
    ZoneCreationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
