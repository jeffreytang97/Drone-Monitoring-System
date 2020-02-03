import {NgModule} from '@angular/core';
import {InfoScreenComponent} from './info-screen.component';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";

const MaterialComponents = [];

@NgModule({
  imports: [
    MaterialComponents,
    MatCardModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    ],
  exports: [MaterialComponents, InfoScreenComponent],
  declarations: [InfoScreenComponent]
})
export class InfoScreenModule {
}
