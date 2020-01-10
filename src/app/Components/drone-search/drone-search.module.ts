import {NgModule} from '@angular/core';
import {DroneSearchComponent} from './drone-search.component';

const MaterialComponents = [];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents, DroneSearchComponent],
  declarations: [DroneSearchComponent]
})
export class DroneSearchModule {
}
