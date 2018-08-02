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
import { RecordTableComponent } from './record-table/record-table.component';
import { UserTableComponent } from './user-table/user-table.component';
import { RecordDashboardComponent } from './record-dashboard/record-dashboard.component';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

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
    RecordTableComponent,
    UserTableComponent,
    RecordDashboardComponent,
    UserFormDialogComponent
  ],
  providers: [],
  entryComponents: [UserFormDialogComponent]
})
export class AdminModule { }
