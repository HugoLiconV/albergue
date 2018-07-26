import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSectionComponent } from './main-module/main-section/main-section.component';
import { DonationsDetailsComponent } from './main-module/donations-details/donations-details.component';
import { EventsDetailsComponent } from './main-module/events-details/events-details.component';
import { ProjectsDetailsComponent } from './main-module/projects-details/projects-details.component';
import { LandingPageComponent } from './main-module/landing-page/landing-page.component';
import { ProjectResolverServiceService, DonationResolverService, EventResolverService } from './_services';

const routes: Routes = [
  { path: '', component: MainSectionComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: LandingPageComponent },
      { path: 'donations-details/:id', component: DonationsDetailsComponent,
        resolve: {donation: DonationResolverService}},
      { path: 'project-details/:id', component: ProjectsDetailsComponent,
        resolve: {project: ProjectResolverServiceService} },
      { path: 'event-details/:id', component: EventsDetailsComponent,
        resolve: {event: EventResolverService}},
    ]
  },
  { path: 'admin', loadChildren: './admin-module/admin.module#AdminModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
