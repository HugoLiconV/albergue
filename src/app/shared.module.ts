import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsSectionComponent } from './main-module/tabs-section/tabs-section.component';
import { CustomMaterialModuleModule } from './custom-material-module.module';
import { ProjectCardComponent } from './shared/cards/project-card/project-card.component';
import { DonationCardComponent } from './shared/cards/donation-card/donation-card.component';
import { EventCardComponent } from './shared/cards/event-card/event-card.component';
import { ContainerComponent } from './shared/container/container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule
    ],
  exports: [
    CommonModule,
    CustomMaterialModuleModule,
    TabsSectionComponent,
    TabsSectionComponent,
    ProjectCardComponent,
    DonationCardComponent,
    EventCardComponent,
    ContainerComponent,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule
  ],
  declarations: [
    TabsSectionComponent,
    ProjectCardComponent,
    DonationCardComponent,
    EventCardComponent,
    ContainerComponent
  ],
  providers: []
})
export class SharedModule { }
