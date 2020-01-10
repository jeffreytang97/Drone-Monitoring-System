import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DroneSearchModule} from "../drone-search/drone-search.module";
import {InfoScreenModule} from "../info-screen/info-screen.module";
import {MapModule} from "../map/map.module";
import {TopBarModule} from "../top-bar/top-bar.module";
import {ZoneSearchModule} from "../zone-search/zone-search.module";


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            DroneSearchModule,
            InfoScreenModule,
            MapModule,
            TopBarModule,
            ZoneSearchModule
            ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
