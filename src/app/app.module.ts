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
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
