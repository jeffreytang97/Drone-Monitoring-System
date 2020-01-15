import {NgModule} from '@angular/core';
import {TopBarComponent} from './top-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

const MaterialComponents = [];

@NgModule({
  imports: [MaterialComponents, MatToolbarModule, MatSidenavModule,],
  exports: [MaterialComponents, TopBarComponent],
  declarations: [TopBarComponent]
})
export class TopBarModule {
}
