import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynChartConfigurerComponent } from './dyn-chart-configurer.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ScatterTraceConfigurerComponent } from './scatter-trace-configurer/scatter-trace-configurer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  declarations: [
    DynChartConfigurerComponent,
    ScatterTraceConfigurerComponent
  ],
  exports: [
    DynChartConfigurerComponent
  ]
})
export class DynChartConfigurerModule {
}
