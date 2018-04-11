import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSectionComponent } from './main-section/main-section.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { EventFormComponent } from './event-form/event-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainSectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPanelComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'project-form', component: ProjectFormComponent },
      { path: 'donation-form', component: DonationFormComponent },
      { path: 'event-form', component: EventFormComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
