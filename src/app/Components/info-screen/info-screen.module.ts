import {NgModule} from '@angular/core';
import {InfoScreenComponent} from './info-screen.component';

const MaterialComponents = [];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents, InfoScreenComponent],
  declarations: [InfoScreenComponent]
})
export class InfoScreenModule {
}
