import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ZoneCreationComponent} from './zone-creation.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";

const MaterialComponents = [];

@NgModule({
  imports: [MaterialComponents, MatCardModule, MatButtonToggleModule, MatFormFieldModule, MatButtonModule],
  exports: [MaterialComponents, ZoneCreationComponent],
  declarations: [ZoneCreationComponent],
})
export class ZoneCreationModule {
}
