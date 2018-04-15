import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSectionComponent } from './main-module/main-section/main-section.component';
import { LoginComponent } from './admin-module/login/login.component';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './admin-module/admin-panel/admin-panel.component';
import { ProjectFormComponent } from './admin-module/project-form/project-form.component';
import { DonationFormComponent } from './admin-module/donation-form/donation-form.component';
import { EventFormComponent } from './admin-module/event-form/event-form.component';
import { AdminDashboardComponent } from './admin-module/admin-dashboard/admin-dashboard.component';
import { DonationsDetailsComponent } from './main-module/donations-details/donations-details.component';

import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainSectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'project-form', component: ProjectFormComponent },
      { path: 'donation-form', component: DonationFormComponent },
      { path: 'event-form', component: EventFormComponent },
    ]
  },
  { path: 'donations-details', component: DonationsDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
