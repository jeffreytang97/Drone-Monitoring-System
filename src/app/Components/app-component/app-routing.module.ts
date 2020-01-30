import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ZoneCreationComponent } from '../zone-creation/zone-creation.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { AboutPageComponent } from '../about-page/about-page.component'
import { ContactPageComponent } from '../contact-page/contact-page.component'

const appRoutes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full"},
    { path: 'home', component: HomePageComponent },
    { path: 'zoneCreation', component: ZoneCreationComponent },
    { path: 'aboutPage', component: AboutPageComponent },
    { path: 'contactPage', component: ContactPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
