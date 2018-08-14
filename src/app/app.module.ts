// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { ObservableMedia } from '@angular/flex-layout';
// JWT
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_interceptors/token.interceptor';

// Components
import { AppComponent } from './app.component';
import { HeroSectionComponent } from './main-module/hero-section/hero-section.component';
import { DetailsSectionComponent } from './main-module/details-section/details-section.component';
import { MainSectionComponent } from './main-module/main-section/main-section.component';
import { FooterSectionComponent } from './main-module/footer-section/footer-section.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DonationsDetailsComponent } from './main-module/donations-details/donations-details.component';
import { EventsDetailsComponent } from './main-module/events-details/events-details.component';
import { ProjectsDetailsComponent } from './main-module/projects-details/projects-details.component';
import { AlertComponent } from './_directives/alert/alert.component';

// Services
import {
  ProjectService,
  DonationService,
  EventsService,
  AuthenticationService,
  AlertService,
  ProjectResolverServiceService,
  DonationResolverService,
  EventResolverService,
  HandleErrorService,
  PersonService,
  RecordService,
  DeviceTypeService,
  DataRefreshService,
  ChartService
  } from './_services';
// Guards
import { AuthGuard } from './_guards/auth-guard';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SharedModule } from './shared.module';
import { LandingPageComponent } from './main-module/landing-page/landing-page.component';
import { ContactCardComponent } from './main-module/contact-card/contact-card.component';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    HeroSectionComponent,
    DetailsSectionComponent,
    MainSectionComponent,
    FooterSectionComponent,
    NavbarComponent,
    DonationsDetailsComponent,
    EventsDetailsComponent,
    ProjectsDetailsComponent,
    AlertComponent,
    LandingPageComponent,
    ContactCardComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    ProjectService,
    DonationService,
    EventsService,
    AuthenticationService,
    ProjectResolverServiceService,
    DonationResolverService,
    EventResolverService,
    PersonService,
    RecordService,
    HandleErrorService,
    DeviceTypeService,
    DataRefreshService,
    ChartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
