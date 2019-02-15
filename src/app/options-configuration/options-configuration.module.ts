import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsConfigurationFormComponent } from './options-configuration-form/options-configuration-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSlideToggleModule
  ],
  declarations: [OptionsConfigurationFormComponent],
  exports: [OptionsConfigurationFormComponent]
})
export class OptionsConfigurationModule { }
