import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourcesComponent } from './data-sources/data-sources.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [DataSourcesComponent],
  exports: [DataSourcesComponent]
})
export class DataSelectionModule { }
