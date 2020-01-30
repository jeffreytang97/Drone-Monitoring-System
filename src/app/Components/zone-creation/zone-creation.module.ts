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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  exports: [MaterialComponents, ZoneCreationComponent],
})
export class ZoneCreationModule {
}
