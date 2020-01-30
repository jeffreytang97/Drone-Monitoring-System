import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ZoneCreationComponent} from './zone-creation.component';
import {environment} from '../../../environments/environment'
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {TopBarModule} from "../top-bar/top-bar.module";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from '@angular/material/sidenav';
import {ZoneCreationMenuModule} from "../zone-creation-menu/zone-creation-menu.module";
import {ZoneSearchModule} from "../zone-search/zone-search.module";
import {MatGridListModule} from "@angular/material/grid-list";

const MaterialComponents = [];

@NgModule({
  declarations: [
    ZoneCreationComponent,
  ],
    imports: [
        MaterialComponents,
        MatButtonModule,
        MatListModule,
        MatSidenavModule,
        TopBarModule,
        ZoneCreationMenuModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        ZoneSearchModule,
        MatGridListModule,
    ],
  exports: [MaterialComponents, ZoneCreationComponent],
})
export class ZoneCreationModule {
}
