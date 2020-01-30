import {NgModule} from '@angular/core';
import {TopBarComponent} from './top-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from '../app-component/app-routing.module';

const MaterialComponents = [];

@NgModule({
  imports: [MaterialComponents, MatToolbarModule, MatSidenavModule, MatButtonModule, AppRoutingModule],
  exports: [MaterialComponents, TopBarComponent],
  declarations: [TopBarComponent]
})
export class TopBarModule {
}
