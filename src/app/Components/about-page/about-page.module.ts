import {NgModule} from '@angular/core';
import {TopBarModule} from "../top-bar/top-bar.module";
import {MatButtonModule} from "@angular/material/button";
import {AboutPageComponent} from './about-page.component'

@NgModule({
  declarations: [
    AboutPageComponent,
  ],
  imports: [
    MatButtonModule,
    TopBarModule,
  ],
  exports: [AboutPageComponent],
})
export class AboutPageModule {
}
