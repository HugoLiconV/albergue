import { AuthGuard } from '../_guards/auth-guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { EventFormComponent } from './event-form/event-form.component';
import { LoginComponent } from './login/login.component';
import { RecordDashboardComponent } from './record-dashboard/record-dashboard.component';

export const adminRoutes = [
  { path: '', component: AdminPanelComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'project-form', component: ProjectFormComponent },
      { path: 'project-form/:id', component: ProjectFormComponent },
      { path: 'donation-form', component: DonationFormComponent },
      { path: 'donation-form/:id', component: DonationFormComponent },
      { path: 'event-form', component: EventFormComponent },
      { path: 'event-form/:id', component: EventFormComponent },
      { path: 'record-dashboard', component: RecordDashboardComponent },
    ]
  },
  { path: 'login', component: LoginComponent}
];
