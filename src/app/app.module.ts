import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { DetailsSectionComponent } from './details-section/details-section.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroSectionComponent,
    DetailsSectionComponent,
    MainSectionComponent,
    FooterSectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
