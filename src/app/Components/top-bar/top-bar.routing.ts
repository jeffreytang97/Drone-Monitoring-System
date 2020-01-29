import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoneCreationComponent } from '../zone-creation/zone-creation.component';

const appRoutes: Routes = [
    { path: "", redirectTo: "main", pathMatch: "full"},
    { path: 'zoneCreation', component: ZoneCreationComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

