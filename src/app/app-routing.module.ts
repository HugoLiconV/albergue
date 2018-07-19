import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSectionComponent } from './main-module/main-section/main-section.component';
import { LoginComponent } from './admin-module/login/login.component';
import { DonationsDetailsComponent } from './main-module/donations-details/donations-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainSectionComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'donations-details', component: DonationsDetailsComponent },
  { path: 'admin', loadChildren: './admin-module/admin.module#AdminModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
