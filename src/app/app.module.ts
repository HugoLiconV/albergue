import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { DetailsSectionComponent } from './details-section/details-section.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { ProjectCardComponent } from './project-card/project-card.component';

// Material
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule, MatCard } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    HeroSectionComponent,
    DetailsSectionComponent,
    MainSectionComponent,
    FooterSectionComponent,
    ProjectCardComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
