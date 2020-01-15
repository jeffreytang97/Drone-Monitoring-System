import {NgModule} from '@angular/core';
import {ZoneSearchComponent} from './zone-search.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

const MaterialComponents = [
  MatFormFieldModule,
  MatListModule,
  CommonModule,
  MatButtonModule,
  MatInputModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents, ZoneSearchComponent],
  declarations: [ZoneSearchComponent]
})
export class ZoneSearchModule {
}
