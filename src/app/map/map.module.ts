import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';

const MaterialComponents = [

];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
  declarations: [MapComponent]
})
export class MapModule { }
