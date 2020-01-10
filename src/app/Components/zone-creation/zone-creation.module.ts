import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ZoneCreationComponent} from './zone-creation.component';

const MaterialComponents = [];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents, ZoneCreationComponent],
  declarations: [ZoneCreationComponent],
})
export class ZoneCreationModule {
}
