import {NgModule} from '@angular/core';
import {InfoScreenComponent} from './info-screen.component';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {MatTabsModule} from '@angular/material/tabs';

const MaterialComponents = [];

@NgModule({
  imports: [MaterialComponents, MatCardModule, CommonModule, AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatTabsModule],
  exports: [MaterialComponents, InfoScreenComponent],
  declarations: [InfoScreenComponent]
})
export class InfoScreenModule {
}
