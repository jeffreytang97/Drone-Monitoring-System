import { NgModule } from '@angular/core';
import { ZoneSearchComponent } from './zone-search.component';

const MaterialComponents = [

];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents, ZoneSearchComponent],
  declarations: [ZoneSearchComponent]
})
export class ZoneSearchModule { }
