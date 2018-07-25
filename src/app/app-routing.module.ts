import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSectionComponent } from './main-module/main-section/main-section.component';
import { DonationsDetailsComponent } from './main-module/donations-details/donations-details.component';
import { EventsDetailsComponent } from './main-module/events-details/events-details.component';
import { ProjectsDetailsComponent } from './main-module/projects-details/projects-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainSectionComponent },
  { path: 'donations-details/:id', component: DonationsDetailsComponent },
  { path: 'project-details/:id', component: ProjectsDetailsComponent },
  { path: 'event-details/:id', component: EventsDetailsComponent },
  { path: 'admin', loadChildren: './admin-module/admin.module#AdminModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
