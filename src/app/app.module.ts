import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { DetailsSectionComponent } from './details-section/details-section.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { ProjectCardComponent } from './project-card/project-card.component';

// Material


import { ObservableMedia } from '@angular/flex-layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DonationCardComponent } from './donation-card/donation-card.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CustomMaterialModuleModule } from './custom-material-module.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ContainerComponent } from './shared/container/container.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EventCardComponent } from './event-card/event-card.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { NavbarAdminComponent } from './shared/navbar-admin/navbar-admin.component';
import { AppRoutingModule } from './app-routing.module';
import { TabsSectionComponent } from './tabs-section/tabs-section.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { EventFormComponent } from './event-form/event-form.component';


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
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModuleModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
