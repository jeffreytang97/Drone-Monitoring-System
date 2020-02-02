import {NgModule} from '@angular/core';
import {TopBarModule} from "../top-bar/top-bar.module";
import {MatButtonModule} from "@angular/material/button";
import {ContactPageComponent} from './contact-page.component'

@NgModule({
  declarations: [
    ContactPageComponent,
  ],
  imports: [
    MatButtonModule,
    TopBarModule,
  ],
  exports: [ContactPageComponent],
})
export class ContactPageModule {
}
