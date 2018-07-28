import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routes';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { EventFormComponent } from './event-form/event-form.component';
import { LoginComponent } from './login/login.component';
import { NavbarAdminComponent } from '../shared/navbar-admin/navbar-admin.component';
import { SharedModule } from '../shared.module';
import { RecordComponent } from './record/record.component';
import { UserTableComponent } from './user-table/user-table.component';
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(adminRoutes)
    ],
  declarations: [
    AdminPanelComponent,
    AdminDashboardComponent,
    ProjectFormComponent,
    DonationFormComponent,
    EventFormComponent,
    LoginComponent,
    NavbarAdminComponent,
    RecordComponent,
    UserTableComponent
  ],
  providers: []
})
export class AdminModule { }
