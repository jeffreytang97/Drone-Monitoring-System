import {NgModule} from '@angular/core';
import {DroneSearchComponent} from './drone-search.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

const MaterialComponents = [
  MatFormFieldModule
];

@NgModule({
  imports: [MaterialComponents, MatInputModule, MatListModule, CommonModule, MatButtonModule],
  exports: [MaterialComponents, DroneSearchComponent],
  declarations: [DroneSearchComponent]
})
export class DroneSearchModule {
}
