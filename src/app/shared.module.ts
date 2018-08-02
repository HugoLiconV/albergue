import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsSectionComponent } from './main-module/tabs-section/tabs-section.component';
import { CustomMaterialModuleModule } from './custom-material-module.module';
import { ProjectCardComponent } from './shared/cards/project-card/project-card.component';
import { DonationCardComponent } from './shared/cards/donation-card/donation-card.component';
import { EventCardComponent } from './shared/cards/event-card/event-card.component';
import { ContainerComponent } from './shared/container/container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './shared/card/card.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { LoadingBarComponent } from './shared/loading-bar/loading-bar.component';
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
    FormsModule,
    ReactiveFormsModule,
    TabsSectionComponent,
    ProjectCardComponent,
    DonationCardComponent,
    EventCardComponent,
    ContainerComponent,
    CardComponent,
    ConfirmationDialogComponent,
    LoadingBarComponent
    // BrowserAnimationsModule
  ],
  declarations: [
    TabsSectionComponent,
    ProjectCardComponent,
    DonationCardComponent,
    EventCardComponent,
    ContainerComponent,
    CardComponent,
    ConfirmationDialogComponent,
    LoadingBarComponent
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: []
})
export class SharedModule { }
