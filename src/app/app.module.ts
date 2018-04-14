// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModuleModule } from './custom-material-module.module';
import { AppRoutingModule } from './app-routing.module';

// JWT
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './guards/token.interceptor';

// Flex Layout
import { ObservableMedia } from '@angular/flex-layout';

// Components
import { AppComponent } from './app.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { DetailsSectionComponent } from './details-section/details-section.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { DonationCardComponent } from './donation-card/donation-card.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ContainerComponent } from './shared/container/container.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EventCardComponent } from './event-card/event-card.component';
import { NavbarAdminComponent } from './shared/navbar-admin/navbar-admin.component';
import { TabsSectionComponent } from './tabs-section/tabs-section.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { EventFormComponent } from './event-form/event-form.component';
import { DonationsDetailsComponent } from './donations-details/donations-details.component';
import { EventsDetailsComponent } from './events-details/events-details.component';
import { ProjectsDetailsComponent } from './projects-details/projects-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AlertComponent } from './directives/alert/alert.component';

// Services
import { ProjectService } from './project.service';
import { DonationService } from './donation.service';
import { EventsService } from './events.service';
import { AuthenticationService } from './auth.service';
import { AlertService } from './services/alert.service';

// Guards
import { AuthGuard } from './guards/auth-guard';


@NgModule({
  declarations: [
    AppComponent,
    HeroSectionComponent,
    DetailsSectionComponent,
    MainSectionComponent,
    FooterSectionComponent,
    ProjectCardComponent,
    DonationCardComponent,
    LoginComponent,
    AdminPanelComponent,
    ProjectFormComponent,
    ContainerComponent,
    NavbarComponent,
    EventCardComponent,
    NavbarAdminComponent,
    TabsSectionComponent,
    DonationFormComponent,
    EventFormComponent,
    DonationsDetailsComponent,
    EventsDetailsComponent,
    ProjectsDetailsComponent,
    AdminDashboardComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModuleModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    ProjectService,
    DonationService,
    EventsService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule {}
