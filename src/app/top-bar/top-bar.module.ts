import { NgModule } from '@angular/core';
import { TopBarComponent } from './top-bar.component';

const MaterialComponents = [

];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
  declarations: [TopBarComponent]
})
export class TopBarModule { }
