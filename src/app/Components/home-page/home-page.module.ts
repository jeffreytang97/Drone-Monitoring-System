import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from '../../../environments/environment'
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {HomePageComponent} from './home-page.component';

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
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  declarations: [
    HomePageComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatListModule,
        MatDividerModule,
        MatCardModule,
        MatGridListModule,
        MatSidenavModule,
        ZoneSearchModule,
        TopBarModule,
        MapModule,
        InfoScreenModule,
        DroneSearchModule,
        ZoneCreationModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        MatTabsModule
    ],
    bootstrap: [HomePageComponent],
    exports: [HomePageComponent]
})
export class HomePageModule {
}
