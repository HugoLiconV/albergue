import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTabsModule,
  MatCardModule,
  MatCard,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatIcon,
  MatMenuModule,
  MatTableModule,
  MatSelectModule,
  MatDatepickerModule,
  MatAutocompleteModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    NoopAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
  ],
  exports: [
    CommonModule,
    NoopAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
  ]
})
export class CustomMaterialModuleModule { }
