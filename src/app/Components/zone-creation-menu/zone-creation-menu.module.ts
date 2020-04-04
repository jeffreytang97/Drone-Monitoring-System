import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneCreationMenuComponent } from './zone-creation-menu.component';
import {ZoneCreationComponent} from "../zone-creation/zone-creation.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatGridListModule} from "@angular/material/grid-list";


@NgModule({
  declarations: [ZoneCreationMenuComponent],
    imports: [MatCardModule, MatButtonToggleModule, MatFormFieldModule, MatButtonModule, MatListModule, CommonModule, MatInputModule, ScrollingModule, MatGridListModule],
  exports: [MatCardModule, MatButtonToggleModule, MatFormFieldModule, MatButtonModule, MatListModule, CommonModule, ZoneCreationMenuComponent],
})
export class ZoneCreationMenuModule { }
